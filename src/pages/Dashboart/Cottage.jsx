import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddCottage from "../../Modal/AddCottage";
import { cottageUtils } from "../../utils/cottage.utils";
import { IMG_BASE_URL } from "../../constants/img.constants";
import EditCottage from "../../Modal/EditCottage";
import EditCottageImage from "../../Modal/EditCottageImage";
import toastify from "../../utils/toastify";
import "./main.css";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../../Components/Loading/Loading";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguageCottage } from "../../utils/multiLanguages";
import { QUERY_KEYS, useCottage } from "../../Query";
import { Helmet } from "react-helmet-async";

function Cottage() {
  const queryClient = useQueryClient();

  // get cottage
  const cottage = useCottage();

  // delete cottage
  const deletCottage = useMutation({
    mutationFn: cottageUtils.deleteCottageAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cottages] });
      toastify.successMessage("O'chirish muvaffaqiyat amalga oshirildi.");
    },
  });

  // language Change
  const { languageChange } = useContext(LanguageContext);
  
  if (cottage.isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Admin Panel | Cottages</title>
      </Helmet>
      <div className="cottage">
        <div className="language-haed d-flex justify-content-between">
          <h2>{multiLanguageCottage.maintitle[languageChange]}</h2>
          <AddCottage />
        </div>
        <div className="cottage-inner">
          {cottage?.data?.length ? (
            <table className="table table-cottage table-bordered shadow">
              <thead>
                <tr>
                  {multiLanguageCottage.tableHead.map((head) => (
                    <th className="col" key={head.id}>
                      {head.title[languageChange]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cottage?.data.filter((el) => el.cottageStatus ==='confirmed').map((el, i) => {
                  return (
                    <tr key={el.id} className="singil-cottage">
                      <th scope="row">{i + 1}</th>
                      <td>{el.name}</td>
                      <td className="position-relative p-1">
                        <LazyLoadImage
                          src={`${IMG_BASE_URL}${el.images.find(el => el.isMainImage).image}`}
                          className="rounded-3 "
                          width={120}
                          height={100}
                          alt="img"
                          effect="blur"
                        />
                        <EditCottageImage id={el.id} images={el.images} />
                      </td>
                      <td>
                        {el.cottageType?.map((e) => {
                          return <p key={e.id}>{e.name}</p>;
                        })}
                      </td>
                      <td className="d-flex flex-column">
                        <p>{el.region.name}</p>
                        <p>{el.place.name} </p>
                      </td>
                      <td>
                        <p
                          className={
                            el.cottageStatus === "confirmed"
                              ? "p-2 rounded fw-bold bg-success text-white text-center"
                              : "p-2 rounded fw-bold text-center bg-warning text-white"
                          }
                        >
                          {el.cottageStatus}
                        </p>
                      </td>
                      <th>
                        <p
                          className={
                            el.status === "active"
                              ? "p-1 bg-success text-white rounded text-center"
                              : "p-1 bg-danger text-white rounded"
                          }
                        >
                          {el.status}
                        </p>
                      </th>
                      {el?.cottageType[0]?.id !== '678811f1-d67c-42fa-a78c-f1d980df3397' ? <td>
                        <p>
                          {el.price} sum
                        </p>
                        <p>
                          {el.priceWeekend} sum(weekend)
                        </p>
                      </td>:
                      <td>Masjid</td>}
                      <td className="d-flex gap-2">
                        <EditCottage id={el.id} cottage={el} />
                        <DeleteAllModal
                          deleteFunction={deletCottage.mutate}
                          id={el.id}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <h3 className="text-xl mt-4">There is no cottage yet ⚠️</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cottage;
