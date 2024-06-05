import React from 'react';
import { CiEdit } from 'react-icons/ci';

const EditOrder = (props) => {
    console.log(props.status);

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
                                Order Status
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form className="p-4">
                                <label className="d-block">
                                    <span className="d-block mb-1 text-start">Order Status</span>
                                    <select
                                        className="form-select"
                                        name="orderStatus"
                                        defaultValue={props.orderStatus}
                                    >
                                        <option value="success">
                                            Success
                                        </option>
                                        <option value="progress">
                                            Progress
                                        </option>
                                        <option value="cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </label>
                                <label className="d-block mt-2">
                                    <span className="d-block mb-1 text-start">Status</span>
                                    <select
                                        className="form-select"
                                        name="status"
                                        defaultValue={props.status}
                                    >
                                        <option value="active">
                                            Active
                                        </option>
                                        <option value="inactive">
                                            Inctive
                                        </option>
                                    </select>
                                </label>
                                <button
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    className="btn btn-modal bg-success fs-6 fw-bold rounded-2 mt-3 text-white d-block"
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
};

export default EditOrder;