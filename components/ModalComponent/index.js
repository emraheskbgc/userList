"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
function ModalComponent({ isOpen, onRequestClose, onSubmitForm }) {
  // app element belirtildi console hatası almamak için
  /* Bu konfigürasyonu yapmanızın temel amacı, ekran okuyucuların modal açıldığında ana içeriği görmemesini sağlamaktır. Bu, erişilebilirlik kurallarına uygun bir yaklaşımdır. */
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const[selectedFile, setSelectedFile] = useState(null)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("image", file);
  };
 
  const fields = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email" },
    { name: "image", label: "Resim URL" },
    { name: "position", label: "Position" },
    { name: "country", label: "Country" },
    { name: "status", label: "Status" },
  ];
  const statusOptions = [
    { label: "Select", value: "" },
    { label: "Active", value: "active" },
    { label: "Offline", value: "offline" },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Ad alanı zorunludur"),
    email: Yup.string()
      .email("Geçersiz email adresi")
      .required("Email alanı zorunludur"),
    image: Yup.mixed().required("Resim URL alanı zorunludur"),
    position: Yup.string().required("Pozisyon alanı zorunludur"),
    country: Yup.string().required("Ülke alanı zorunludur"),
    status: Yup.string().required("Durum alanı zorunludur"),
  });
  const customStyles = {
    content: {
      width: "40%", // Örneğin, modal genişliği
      height: "60%", // Örneğin, modal yüksekliği
      margin: "auto",
      borderRadius: "10px",
    },
  };
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
        id: uuidv4(),
        image: imageUrl,
      };

      onSubmitForm(userWithUUID);
      onRequestClose();
      formik.resetForm();
    } catch (error) {
      console.error("Dosya işlemleri hatası:", error);
    }
  };
  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    // formik.values değiştiğinde formData'yı güncelle
    setFormData(formik.values);
  }, [formik.values]);
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <form onSubmit={formik.handleSubmit}>
        <h1 className="font-[500] text-2xl mb-6">Add new user</h1>
        <hr />

        <div className="flex flex-wrap mb-4">
          {fields.map((field) => (
            <div
              key={field.name}
              className="flex flex-wrap flex-col mr-4 mb-4 mt-4"
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
                  className="w-[250px]"
                />
              ): field.name === "image" ? (
                <div>
                <label className="mb-1">{field.label}</label>
                <input
                    type="file"
                    id={field.name}
                    name={field.name}
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                    className="border"
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
                  className="bg-gray-100 px-3 text-gray-700 border w-[250px] rounded-md h-[40px]"
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
          className="bg-btnBg rounded-lg px-4 py-2 mt-8 text-white font-medium flex flex-row items-center "
        >
          Add user
        </button>
      </form>
    </Modal>
  );
}

export default ModalComponent;
