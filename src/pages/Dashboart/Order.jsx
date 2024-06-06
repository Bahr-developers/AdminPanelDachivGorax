import { Helmet } from "react-helmet-async";
import { QUERY_KEYS, useOrderAdmin } from "../../Query";
import { multiLanguageOrder } from "../../utils/multiLanguages";
import { useContext } from "react";
import { LanguageContext } from "../../Helper/LanguageContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderUtils } from "../../utils/order.utils";
import { toast } from "react-toastify";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import EditOrder from "../../Modal/EditOrder";

const Order = () => {
    const { languageChange } = useContext(LanguageContext);
    const orders = useOrderAdmin()

    const queryClient = useQueryClient()
    const deleteOrder = useMutation({
        mutationFn: OrderUtils.deleteOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.order]})
            toast.success("Success delete")
        },
        onError: (err) => {
            console.log(err);
            toast.error("Error delete")
        }
    })

    return (
        <>
            <Helmet>
                <title>Admin Panel | Order </title>
            </Helmet>
            <div className="order">
                <div className="order-haed d-flex justify-content-between">
                    <h2>{multiLanguageOrder.maintitle[languageChange]}</h2>
                </div>
                <div className="order-inner">
                    {orders?.data?.length ? (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    {multiLanguageOrder.tableHead.map((head) => (
                                        <th scope="col" key={head.id}>
                                            {head.title[languageChange]}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((e, i) => {
                                    return (
                                        <tr key={e.id}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{e.cottage.name}</td>
                                            <td>{e.user.name}</td>
                                            <td>
                                                {e.tariff.type}
                                            </td>
                                            <td>
                                            <button
                                                    className={
                                                        e.orderStatus === "cancelled" 
                                                            ? "bg-danger ds-6 text-white btn btn-group fw-medium"
                                                            : e.orderStatus==="success" ? "bg-success text-white btn btn-group fw-medium" :"bg-warning text-white btn btn-group fw-medium"
                                                    }
                                                >
                                                    {e.orderStatus}
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className={
                                                        e.status === "inactive"
                                                            ? "bg-danger ds-6 text-white btn btn-group fw-medium"
                                                            : "bg-success text-white btn btn-group fw-medium"
                                                    }
                                                >
                                                    {e.status}
                                                </button>
                                            </td>
                                            <td>
                                                <EditOrder id={e.id} status={e} />
                                            </td>
                                            <td>
                                                <DeleteAllModal
                                                    deleteFunction={deleteOrder.mutate}
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
                            <h3 className="text-xl mt-4">There is no translate</h3>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Order;