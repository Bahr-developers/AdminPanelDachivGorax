import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cottageUtils } from "../utils/cottage.utils";
import { useRef, useState } from "react";
import { IMG_BASE_URL } from "../constants/img.constants";
import toastify from "../utils/toastify";

//Lazy load
import { LazyLoadImage } from "react-lazy-load-image-component";

//icons
import { CiEdit } from "react-icons/ci";
import { FaUpload } from "react-icons/fa";
import { QUERY_KEYS } from "../Query";
import { MdDelete } from "react-icons/md";
import ImageCropper from "./ImageCropper";

function EditCottageImage({ id, images }) {
  const mainImageRef = useRef(null);

  const childImagesWrapper = useRef(null);
  const [mainImage, setMainImage] = useState(images.find((e) => e.isMainImage === true))
  const imageId = images.find((e) => e.isMainImage === true).id
  const queryClient = useQueryClient();
  const childImages = images.filter((e) => e.isMainImage !== true);

  const cottageMainImg = useMutation({
    mutationFn: cottageUtils.patchCottageImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
      toastify.successMessage('Success a new main image')      
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const addCottageImage = useMutation({
    mutationFn: cottageUtils.addCottageImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const deletChilImage = useMutation({
    mutationFn: cottageUtils.deleteCottageImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
      toastify.successMessage("Success delete image");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const addChildImg = async (e) => {
    addCottageImage.mutate({
      cottageId: id,
      image: e.target.files[0],
      isMain: false,
    });
  };

  

  const handlCottage =  () => {
    if (imageId) {
      cottageMainImg.mutate({
        id: imageId,
        image: mainImage,
      });
      return;
    }

    addCottageImage.mutate({
      cottageId: id,
      image: mainImage,
      isMain: true,
    });
    return;
  };

  return (
    <div>
      <button
        type="button"
        className="btn position-absolute text-danger z-1 top-0 end-0"
        data-bs-toggle="modal"
        data-bs-target={`#editImages${id}`}
      >
        <CiEdit className="text-white bg-success rounded-circle" size={25} />
      </button>
      <div
        className="modal modal-lg fade"
        id={`editImages${id}`}
        tabIndex="-1"
        aria-labelledby={`editImages${id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 fw-bold"
                id={`editImages${id}Label`}
              >
                Cottage Images Updete
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="p-4">
                <div className="gap-2 border p-3">
                  <ImageCropper  onImageCropped={setMainImage}/>
                  {mainImage?.image && (
                    <LazyLoadImage
                      ref={mainImageRef}
                      src={`${IMG_BASE_URL}${mainImage.image}`}
                      alt="main-image"
                      width={400}
                      height={230}
                      className="rounded-3"
                    />
                  )}
                </div>
                <div className="imagesMultiple mt-4 border p-2 rounded">
                  <label className="file-input-label d-block w-25 text-center mb-2">
                    <input
                      onChange={addChildImg}
                      type="file"
                      accept="image/*"
                      name="childimg"
                      id="cottage-main-img"
                      className="file-input"
                      multiple
                    />
                    <FaUpload size={30} />
                    <span>Child Images</span>
                  </label>
                  <div
                    ref={childImagesWrapper}
                    className="imagesChildWrap mt-4 flex-wrap d-flex gap-4"
                  >
                    {childImages?.length &&
                      childImages.map((e) => {
                        return (
                          <div key={e.id} className="childImgCard">
                            <LazyLoadImage
                              src={`${IMG_BASE_URL}${e.image}`}
                              width={100}
                              height={120}
                              alt="childImages"
                              className="childImage"
                              effect="blur"
                            />
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => deletChilImage.mutate(e.id)}
                            >
                              <MdDelete size={25} />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <button
                  onClick={handlCottage}
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCottageImage;
