"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
function ModalComponent({ isOpen, onRequestClose, onSubmitForm, isEditMode , userToEdit }) {
  // app element belirtildi console hatası almamak için
  /* Bu konfigürasyonu yapmanızın temel amacı, ekran okuyucuların modal açıldığında ana içeriği görmemesini sağlamaktır. Bu, erişilebilirlik kurallarına uygun bir yaklaşımdır. */
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  // dosya eklemeden eklenen image file dosyasını saklamak için
  const[selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    // Dosya seçildiğinde, dosyanın URL'ini oluştur ve formik değerini güncelle
    const imageUrl = file ? URL.createObjectURL(file) : "";
    formik.setFieldValue("image", imageUrl);
  
    setSelectedFile(file);
  };
  
  
 // dosya eklemeden eklenen image file dosyasını saklamak için
 // formda tutulcak inputların alanı
 const fields = [
   { name: "name", label: "Name" },
   { name: "email", label: "Email" },
   { name: "image", label: "Resim URL" },
   
   { name: "position", label: "Position" },
   { name: "country", label: "Country" },
   { name: "status", label: "Status" },
   
  ]
  // formda tutulcak inputların alanı
  // formdaki status alanının seçenekleri
  const statusOptions = [
    { label: "Select", value: "" },
    { label: "Active", value: "active" },
    { label: "Offline", value: "offline" },
  ];
  // formdaki status alanının seçenekleri
  // form içeriğinin yup ile içerik kontrolünün sağlanması
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    image: Yup.mixed().required("Image URL is required"),
    position: Yup.string().required("Position is required"),
    country: Yup.string().required("Country is required"),
    status: Yup.string().required("Status is required"),
  });
  // form içeriğinin yup ile içerik kontrolünün sağlanması
  // modal divin tasarım css ayarlanması
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600; // Mobil ekran genişliği kontrolü
  const customStyles = {
    content: {
      width: isMobile ? "90%" : "45%", // Mobilde genişlik daha dar
      height: "60%", // Örneğin, modal yüksekliği
      margin: isMobile ? "0" : "auto", // Masaüstünde sadece yatayda merkezlemek için
      top: isMobile ? "50%" : "20%", // Mobilde sayfanın ortasına konumlandır
      bottom: isMobile ? "auto" : "",
      left: isMobile ? "50%" : "25%", // Mobilde sayfanın ortasına konumlandır
      right: isMobile ? "auto" : "",
      transform: isMobile ? "translate(-50%, -50%)" : "none", // Mobilde sayfanın ortasına konumlandır
      borderRadius: "10px",
    },
  };
  // modal divin tasarım css ayarlanması
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    position: "",
    country: "",
    status: "",
  });
  const handleFormSubmit = async (values) => {
    try {
      const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : "";

      const userWithUUID = {
        ...values,
        id: isEditMode ? userToEdit.id : uuidv4(),
        image: imageUrl,
      };

      onSubmitForm(userWithUUID);
      onRequestClose();
      formik.resetForm();
    } catch (error) {
      console.error("File processing error:", error);
    }
  };
  const formik = useFormik({
    initialValues: isEditMode ? userToEdit : formData,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (!isEditMode) {
      // Yeni bir kullanıcı eklemek için modal açıldığında form verilerini sıfırla
      formik.resetForm();
      // Eklenen dosyayı sıfırla
    } else if (isEditMode && userToEdit) {
      // Dosya seçiliyse, dosyanın URL'ini oluştur ve formik değerini güncelle
      const imageUrl = selectedFile ? URL.createObjectURL(selectedFile) : "";
  
      // formik.values'i güncelle
      formik.setValues({
        ...userToEdit, // userToEdit değerleriyle doldur
        image: imageUrl, // Dosyanın URL'sini ekleyerek image alanını güncelle
      });
     
    }
    
  }, [isEditMode, userToEdit]);
 
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <form onSubmit={formik.handleSubmit} className="p-4">
        <h1 className="font-semibold text-xl mb-6 text-center">{isEditMode ? "Edit user" : "Add new user"}</h1>
        <hr />

        <div className="flex flex-col mb-4 mt-3">
          {fields.map((field) => (
            <div
              key={field.name}
              className="flex flex-col mb-4"
            >
              <label className="mb-1">{field.label}</label>
              {field.name === "status" ? (
                <Select
                  id={field.name}
                  name={field.name}
                  options={statusOptions}
                  onChange={(selectedOption) =>
                    formik.setFieldValue(field.name, selectedOption.value)
                  }
                  onBlur={formik.handleBlur}
                  value={statusOptions.find(
                    (option) => option.value === formik.values[field.name]
                  )}
                  className="w-full"
                />
              ): field.name === "image" ? (
                <div className="border w-full flex flex-col">
              
                <input
                    type="file"
                    id={field.name}
                    name={field.name}
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                    
                  />
                </div>
              ) : (
                <input
                  type="text"
                  id={field.name}
                  name={field.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.name]}
                  className="bg-gray-100 px-3 text-gray-700 border rounded-md h-[40px] w-full"
                />
              )}

              {formik.touched[field.name] && formik.errors[field.name] ? (
                <div className="text-red-500 mt-1">
                  {formik.errors[field.name]}
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <hr />
        <button
          type="submit"
          className="bg-btnBg rounded-lg px-4 py-2 mt-4 text-white font-medium w-full"
        >
          {isEditMode ? "Update user" : "Add user"}
        </button>
      </form>
    </Modal>
  );
}

export default ModalComponent;
