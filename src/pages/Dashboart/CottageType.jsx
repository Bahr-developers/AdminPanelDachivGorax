import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cottageTypeUtils } from "../../utils/cottage-type.utils";
import AddCottageType from "../../Modal/AddCottageType";
import EditCottageType from "../../Modal/EditCottageType";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import toastify from "../../utils/toastify";
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguageCottageType } from "../../utils/multiLanguages";
import { QUERY_KEYS, useCottageType } from "../../Query";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMG_BASE_URL } from "../../constants/img.constants";
import EditCottageTypeImg from "../../Modal/EditCottageTypeImg";

function CottageType() {
  const queryClient = useQueryClient();

  // get cottage Type
  const cottageType = useCottageType();

  // delete Cottage type
  const deletCottageType = useMutation({
    mutationFn: cottageTypeUtils.deleteCottageType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottagetypes] });
      toastify.successMessage("Cottage type deleted😅");
    },
  });

  // language Change
  const { languageChange } = useContext(LanguageContext);

  if (cottageType.isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Admin Panel | Cottage Type</title>
      </Helmet>
      <div>
        <div className="place">
          <div className="place-haed d-flex justify-content-between">
            <h2>{multiLanguageCottageType.maintitle[languageChange]}</h2>
            <AddCottageType />
          </div>
          <div className="language-inner">
            {cottageType.data?.length ? (
              <table className="table text-center table-bordered">
                <thead>
                  <tr>
                    {multiLanguageCottageType.tableHead.map((head) => (
                      <th className="col" key={head.id}>
                        {head.title[languageChange]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cottageType.data.map((e, i) => {
                    return (
                      <tr key={e.id}>
                        <th scope="row">{i + 1}</th>
                        <td>{e.name}</td>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <LazyLoadImage
                              width={95}
                              height={65}
                              src={`${IMG_BASE_URL}${e.image}`}
                              alt="img"
                              effect="blur"
                            />
                            <EditCottageTypeImg place={e} />
                          </div></td>
                        <td>
                          <EditCottageType id={e.id} />
                        </td>
                        <td>
                          <DeleteAllModal
                            deleteFunction={deletCottageType.mutate}
                            id={e.id}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>
                <h3 className="mt-4 text-xl">There is no cottage type yet ⚠️</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CottageType;
