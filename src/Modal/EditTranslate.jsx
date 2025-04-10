import { useMutation, useQueryClient } from "@tanstack/react-query";
import { languageUtils } from "../utils/language.utils";
import { CiEdit } from "react-icons/ci";
import { QUERY_KEYS, useLanguage } from "../Query";
import { translateUtils } from "../utils/translate.utils";
import { toast } from "react-toastify";

function EditTranslate(props) {
  const queryClient = useQueryClient();

  // get translate definiton in one object
  const translate = {};
  props.translate.definition.forEach((item) => {
    translate[item.language.code] = item.value;
  });

  // get Language
  const getLanguage = useLanguage();

  // edit Translate mutate function
  const editTranslate = useMutation({
    mutationFn: translateUtils.patchTranslate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.translates] });
      toast.success("Translate muvaffaqiyatli o'zgartirildi");
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  // handleEditTranslate
  const EditTranslate = (e) => {
    e.preventDefault();
    const definition = {};
    getLanguage.data.forEach((language) => {
      const inputValue = e.target[language.code].value;
      definition[language.code] = inputValue;
    });
    editTranslate.mutate({
      id: props.id,
      definition,
    });
  };

  return (
    <div className="edit-translate">
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target={`#editModal${props?.id}`}
      >
        <CiEdit size={25} />
      </button>
      <div
        className="modal fade"
        id={`editModal${props?.id}`}
        tabIndex="-1"
        aria-labelledby={`editModal${props?.id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={`editModal${props?.id}Label`}
              >
                Edit Translate
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="p-4" onSubmit={EditTranslate}>
                {getLanguage?.data.map((language) => (
                  <label className="w-100 d-block mb-2" key={language.id}>
                    <span className="d-block w-100">
                      {" "}
                      {language?.code} definition
                    </span>
                    <textarea
                      className="p-1 w-100 d-block form-control"
                      required
                      type="text"
                      name={`${language.code}`}
                      placeholder={`${language.code} definition`}
                      defaultValue={translate[language.code]}
                    />
                  </label>
                ))}
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-modal bg-success fs-6 fw-bold rounded-2 text-white d-block"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTranslate;
