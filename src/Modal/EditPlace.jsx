import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { placeUtils } from "../utils/place.utils";
import toastify from "../utils/toastify";
import { QUERY_KEYS, useUnusedTranslates } from "../Query";

function EditPlace(props) {
  const queryClient = useQueryClient();

  const unusedTranslates = useUnusedTranslates();

  const editplace = useMutation({
    mutationFn: placeUtils.patchPlace,
    onSuccess: () =>
      Promise.all([
        toastify.successMessage("Joy nomi muvaffaqiyatli o'zgartirildi"),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.unusedTranslates],
        }),
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.places] }),
      ]),
    onError: (err) => {
      toastify.errorMessage("Hatolik yuz berdi");
      console.log(err);
    },
  });

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
    editplace.mutate({
      id: props?.id,
      name: e.target?.editPlace?.value,
    });
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editModa${props.id}`}
      >
        <CiEdit size={25} />
      </button>
      <div
        className="modal fade"
        id={`editModa${props.id}`}
        tabIndex="-1"
        aria-labelledby={`editModa${props.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`editModa${props.id}Label`}>
                Edit Place
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
                <label className="d-block mb-3">
                  <span className="text-start d-block mb-1">Select Place</span>
                  <select
                    className="form-select"
                    name="editPlace"
                    defaultValue={"select place"}
                  >
                    <option value="" disabled>
                      select place
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

export default EditPlace;
