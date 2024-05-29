import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import toastify from "../utils/toastify";
import { QUERY_KEYS } from "../Query";
import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { comfortUtils } from "../utils/comfort.utils";
import { MdCloudUpload } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Images transform getbase64Full
async function getBase64Full(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

function EditComfortImage(props) {
  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  const editComfortImage = useMutation({
    mutationFn: comfortUtils.editComfortImage,
    onSuccess: () => {
      toastify.successMessage("Image successfully edited");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.comforts] });
    },
    onError: (err) => {
      toastify.error("Something went wrong");
      console.log("err", err);
    },
  });

  const handleGetFile = (e) => {
    const files = e.target.files[0];
    setFile(files);
    if (files) {
      setImage(URL.createObjectURL(files));
    }
  };

  const handleComfort = (e) => {
    e.preventDefault();
    editComfortImage.mutate({
      id: props?.id,
      image: file,
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editComfortModal${props.id}`}
      >
        <CiEdit size={25} />
      </button>
      <div
        className="modal fade"
        id={`editComfortModal${props.id}`}
        tabIndex="-1"
        aria-labelledby={`editComfortModal${props.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={`editComfortModal${props.id}Label`}
              >
                Edit Comfort Image
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handleComfort}>
                <div className="d-flex align-items-center gap-5 my-4">
                  <label className="btn btn-primary d-flex align-items-center gap-2">
                    <MdCloudUpload size={25} />
                    <span className="d-block">Upload Img</span>
                    <input
                      id="uploadImg"
                      className="d-none"
                      type="file"
                      name="file"
                      onChange={handleGetFile}
                    />
                  </label>
                  {image ? (
                    <LazyLoadImage
                      src={image}
                      width={60}
                      height={60}
                      alt="place image"
                      effect="blur"
                      className="rounded"
                    />
                  ) : (
                    <p className="m-0">No choosen image</p>
                  )}
                </div>
                <button
                  type="submit"
                  data-bs-toggle="modal"
                  className="btn-modal bg-success btn fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditComfortImage;
