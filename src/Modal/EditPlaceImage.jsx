import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { placeUtils } from "../utils/place.utils";
import toastify from "../utils/toastify";
import { QUERY_KEYS } from "../Query";
import { useRef } from "react";
import { FaUpload } from "react-icons/fa";

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

function EditPlaceImg(props) {
  const queryClient = useQueryClient();
  const image = useRef(null);

  const editPlaceImg = useMutation({
    mutationFn: placeUtils.editPlaceImg,
    onSuccess: () => {
      toastify.successMessage("Image successfully edited");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.places] });
    },
    onError: (err) => {
      toastify.errorMessage("Something went wrong");
      console.log("err", err);
    },
  });

  const handlPlace = (e) => {
    e.preventDefault();
    console.log(props.id);
    editPlaceImg.mutate({
      id: props.id,
      image: e.target.image.files[0],
    });
  };

  const Image = async (e) => {
    console.log(e.target.files);
    image.current.src = await getBase64Full(e.target.files[0]);
    image.current.classList.remove("d-none");
    image.current.classList.add("d-block");
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editPlaceImage${props.id}`}
      >
        <CiEdit size={25} />
      </button>
      <div
        className="modal fade"
        id={`editPlaceImage${props.id}`}
        tabIndex="-1"
        aria-labelledby={`editPlaceImage${props.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editModa${props.id}Label`}>
                Edit Place Image
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlPlace}>
                <div>
                  <label className="file-input-label d-block mb-4 w-50">
                    <input
                      type="file"
                      onChange={Image}
                      name="image"
                      className="file-input"
                    />
                    <FaUpload size={30} />
                    <span>Place Image</span>
                  </label>
                  <img
                    ref={image}
                    width={150}
                    height={170}
                    src=""
                    alt="img"
                    className="main-image d-none"
                  />
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

export default EditPlaceImg;
