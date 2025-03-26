import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddRoles from "../../Modal/AddRoles";
import { rolesUtils } from "../../utils/roles.utils";
import toastify from "../../utils/toastify";
import EditRoles from "../../Modal/EditRoles";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import Loading from "../../Components/Loading/Loading";
import { useContext, useState } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { multiLanguageRoles } from "../../utils/multiLanguages";
import { QUERY_KEYS, useRoles } from "../../Query";
import { Helmet } from "react-helmet-async";
import { IoIosArrowDown } from "react-icons/io";

function Roles() {
  const queryClient = useQueryClient();
  const [showPer, setShowPer] = useState({})
  // get roles
  const roles = useRoles();
  const handleShowPermissions = (id, length) => {
    setShowPer((prev) => ({
      ...prev,
      [id]: prev[id] === length ? 5 : length, // Agar bosilgan bo'lsa qisqartiradi
    }));
  };
  // delete roles
  const deletRoles = useMutation({
    mutationFn: rolesUtils.deleteRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.roles] });
      toastify.successMessage("Role muvaffaqiyatli o'chirildi");
    },
    onError: () => {
      toastify.successMessage("Xatolik mavjud");
    },
  });
console.log(roles);



  // language Change
  const { languageChange } = useContext(LanguageContext);

  if (roles.isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Admin Panel | Roles</title>
      </Helmet>
      <div className="comforts">
        <div className="language-haed d-flex justify-content-between">
          <h2>{multiLanguageRoles.maintitle[languageChange]}</h2>
          <AddRoles />
        </div>
        <div className="language-inner">
          {roles?.data?.length ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  {multiLanguageRoles.tableHead.map((head) => (
                    <th className="col" key={head.id}>
                      {head.title[languageChange]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.data.map((el, i) => {
                  const visibleCount = showPer[el.id] || 5;
                  return (
                    <tr key={el.id}>
                      <th scope="row">{i + 1}</th>
                      <td className="fw-medium fs-5">{el.name}</td>
                      <td>
                        <ol>
                          {el.permissions.slice(0, visibleCount).map((e) => (
                            <li key={e.permission.id} className="fw-medium fs-5">
                              {e.permission.name}
                            </li>
                          ))}

                          {el.permissions.length > 5 && (
                            <p
                              role="button"
                              className="text-blue-500 cursor-pointer"
                              onClick={() => handleShowPermissions(el.id, el.permissions.length)}
                            >
                              {visibleCount === el.permissions.length ? "Hide Permissions" : "View All Permissions"} <IoIosArrowDown />
                            </p>
                          )}
                        </ol>
                      </td>
                      <td className="fw-medium fs-5">
                        <EditRoles role={el}/>
                      </td>
                      <td className="fw-medium fs-5">
                        {/* <DeleteAllModal
                          deleteFunction={deletRoles.mutate}
                          id={el.id}
                        /> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <h3 className="mt-4 text-xl">There is no roles yet ⚠️</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Roles;
