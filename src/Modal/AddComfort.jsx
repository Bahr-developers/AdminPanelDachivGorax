import { useMutation, useQueryClient } from "@tanstack/react-query";
import { comfortUtils } from "../utils/comfort.utils";
import toastify from "../utils/toastify";
import { useContext, useRef, useState } from "react";
import { multiAddComfort } from "../utils/multiLanguages";
import { LanguageContext } from "../Helper/LanguageContext";

import { QUERY_KEYS, useUnusedTranslates } from "../Query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdCloudUpload } from "react-icons/md";

function AddComfort() {
  const addComfortBtn = useRef(null);

  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  // get ununusedTranslates
  const unusedTranslates = useUnusedTranslates();

  // add comfort
  const addComfort = useMutation({
    mutationFn: comfortUtils.postComfort,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.comforts],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.unusedTranslates],
      });
      toastify.successMessage("Qo'shish muvaffaqiyatli amalga oshirildi");
    },
    onError: (err) => {
      toastify.errorMessage(err.message);
      console.log(err);
    },
  });

  // handle get image
  const handleGetFile = (e) => {
    const files = e.target.files[0];
    setFile(files);
    if (files) {
      setImage(URL.createObjectURL(files));
    }
  };

  const handlComforts = (e) => {
    e.preventDefault();
    addComfort.mutate({
      name: e.target.comfort.value,
      image: file,
    });
  };

  // language Change
  const { languageChange } = useContext(LanguageContext);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addcomfort"
      >
        {multiAddComfort[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addcomfort"
        tabIndex="-1"
        aria-labelledby="addcomfortLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 fw-bold" id="addcomfortLabel">
                Comforts
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlComforts}>
                <label className="d-block">
                  <span className="d-block mb-1">Enter comfort</span>
                  <select
                    name="comfort"
                    className="form-select"
                    defaultValue={"select comfort"}
                    required
                  >
                    <option value="" disabled>
                      select comfort
                    </option>
                    {unusedTranslates.data?.length &&
                      unusedTranslates.data.map((e) => {
                        return (
                          <option key={e.id} value={e.id}>
                            {e.code}
                          </option>
                        );
                      })}
                  </select>
                </label>
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
                  ref={addComfortBtn}
                  type="submit"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 mt-4 fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddComfort;
