import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { placeUtils } from "../utils/place.utils";
import toastify from "../utils/toastify";
import { QUERY_KEYS } from "../Query";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdCloudUpload } from "react-icons/md";

function EditPlaceImg({ place }) {
  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

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

  const handleGetFile = (e) => {
    const files = e.target.files[0];
    setFile(files);
    if (files) {
      setImage(URL.createObjectURL(files));
    }
  };

  const handlPlace = (e) => {
    e.preventDefault();
    editPlaceImg.mutate({
      id: place?.id,
      image: file,
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editPlaceImage${place.id}`}
      >
        <CiEdit size={25} />
      </button>
      <div
        className="modal fade"
        id={`editPlaceImage${place.id}`}
        tabIndex="-1"
        aria-labelledby={`editPlaceImage${place.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editModa${place.id}Label`}>
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
                <div className="d-flex align-items-center gap-5 mb-4">
                  <label className="btn btn-primary d-flex align-items-center gap-2">
                    <MdCloudUpload size={25} />
                    <span className="d-block">Upload Img</span>
                    <input
                      id="uploadImg"
                      className="d-none"
                      type="file"
                      accept="image/*"
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

export default EditPlaceImg;
