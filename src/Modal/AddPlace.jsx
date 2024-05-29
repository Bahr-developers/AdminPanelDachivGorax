import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeUtils } from "../utils/place.utils";
import toastify from "../utils/toastify";
import { multiAddPlace } from "../utils/multiLanguages";
import { useContext, useState } from "react";
import { LanguageContext } from "../Helper/LanguageContext";
import { QUERY_KEYS, useRegion, useUnusedTranslates } from "../Query";

import { MdCloudUpload } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";

function AddPlace() {
  const queryClient = useQueryClient();
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");

  // get region
  const region = useRegion();

  // unusedTranslates
  const unusedTranslates = useUnusedTranslates();

  // add place
  const addPlace = useMutation({
    mutationFn: placeUtils.postPalce,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.places],
        }),
        queryClient.invalidateQueries(QUERY_KEYS.unusedTranslates),
        toastify.successMessage("Joy  muvaffaqiyatli qo'shildi"),
      ]);
    },
    onError: (err) => {
      console.log(err);
      toastify.errorMessage("Hatolik mavjud");
    },
  });

  // get Image
  const handleChange = (e) => {
    const files = e.target.files[0];
    setFile(files);
    if (files) {
      setImage(URL.createObjectURL(files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addPlace.mutate({
      name: e.target.placaname.value,
      image: file,
      regionId: e.target.region.value,
    });
  };

  // language Change
  const { languageChange } = useContext(LanguageContext);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addPlace"
      >
        {multiAddPlace[languageChange]}
      </button>
      <div
        className="modal fade"
        id="addPlace"
        tabIndex="-1"
        aria-labelledby="addPlaceLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addPlaceLabel">
                Add Place
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={handleSubmit}>
                <label className="d-block mb-2">
                  <span className="d-block">Select place name</span>
                  <select
                    name="placaname"
                    className="form-select"
                    defaultValue="select place name"
                  >
                    <option value="select place name" disabled>
                      select place name
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
                <label className="d-block mb-3">
                  <span className="d-block">Select Region</span>
                  <select
                    className="form-select"
                    name="region"
                    defaultValue={"select region name"}
                  >
                    <option value="select region name" disabled>
                      select region name
                    </option>
                    {region.data?.length &&
                      region.data.map((e) => {
                        return (
                          <option key={e.id} value={e.id} className="text-dark">
                            {e.name}
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
    </>
  );
}

export default AddPlace;
