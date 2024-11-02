import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cottageTypeUtils } from "../utils/cottage-type.utils";
import toastify from "../utils/toastify";
import { useContext, useState } from "react";
import { LanguageContext } from "../Helper/LanguageContext";
import { multiAddCottageType } from "../utils/multiLanguages";
import { QUERY_KEYS, useUnusedTranslates } from "../Query";
import { MdCloudUpload } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

function AddCottageType() {
  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  const unusedTranslates = useUnusedTranslates();

  const addCottageType = useMutation({
    mutationFn: cottageTypeUtils.postCottageType, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottagetypes] });
      toastify.successMessage("Dacha tipi muvaffaqiyatli qo'shildi");
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage("Dacha tipini qo'shishda xatolik");
    },
  });
  const handleChange = (e) => {
    const files = e.target.files[0];
    setFile(files);
    if (files) {
      setImage(URL.createObjectURL(files));
    }
  };

  const handlCottageType = (e) => {
    e.preventDefault();
    addCottageType.mutate({
      name: e.target.cottageType.value,
      image: file
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
        data-bs-target="#addCottageType"
      >
        {multiAddCottageType[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addCottageType"
        tabIndex="-1"
        aria-labelledby="addCottageTypeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addCottageTypeLabel">
                Add Cottage Type
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handlCottageType}>
                <label className="d-block">
                  <span className="text-start mb-1 d-block">
                    Select cottage type
                  </span>
                  <select
                    className="form-select mb-4"
                    name="cottageType"
                    id="region-dash"
                    defaultValue={"select cottage type"}
                  >
                    <option value="" disabled>
                      select cottage type
                    </option>
                    {unusedTranslates.data?.length &&
                      unusedTranslates.data.map((el) => {
                        return (
                          <option key={el.id} value={el.id}>
                            {el.code}
                          </option>
                        );
                      })}
                  </select>
                </label>
                <div className="d-flex align-items-center gap-5 mb-4">
                  <label
                    htmlFor="uploadImg"
                    className="btn btn-primary d-inline-flex align-items-center gap-2"
                  >
                    <MdCloudUpload size={25} />
                    <span className="d-block">Upload Img</span>
                    <input
                      id="uploadImg"
                      className="d-none"
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={handleChange}
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
                  data-bs-dismiss="modal"
                  className="btn-modal bg-success border-0 fs-6 fw-bold rounded-2 text-white d-block"
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

export default AddCottageType;
