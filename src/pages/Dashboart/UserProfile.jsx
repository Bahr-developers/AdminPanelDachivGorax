import React from "react";
import { useSingleUser } from "../../Query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMG_BASE_URL } from "../../constants/img.constants";

// icons
import { PiUserCircleLight } from "react-icons/pi";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
  const getSingleUser = useSingleUser()?.data;

  return (
    <>
      <Helmet>
        <title>Admin Panel | User Profile</title>
      </Helmet>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            {getSingleUser?.image ? (
              <LazyLoadImage
                src={`${IMG_BASE_URL}${getSingleUser?.image}`}
                effect="blur"
                className="userProfileImg"
                height={300}
                alt="userPhoto"
              />
            ) : (
              <span>
                <PiUserCircleLight size={300} />
              </span>
            )}
          </div>
          <div className="col-md-8">
            <div className="mb-3">
              <span className="fw-bold">User Fullname : </span>
              <span>{getSingleUser?.name}</span>
            </div>
            <div className="mb-3">
              <span className="fw-bold">User Email : </span>
              <span>{getSingleUser?.email}</span>
            </div>
            <div className="mb-3">
              <span className="fw-bold">Username : </span>
              <span>{getSingleUser?.username}</span>
            </div>
            <div className="mb-3">
              <span className="fw-bold">Password : </span>
              <span>{getSingleUser?.password}</span>
            </div>
            <div className="mb-3">
              <span className="fw-bold">Roles : </span>
              <div className="d-inline-flex">
                {getSingleUser?.roles?.map(({ role }) => (
                  <span key={role.id} className="badge bg-secondary me-1">
                    {role.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <span className="fw-bold">Balance : </span>
              <span>
                {getSingleUser?.balance
                  ? getSingleUser?.balance.toLocaleString()
                  : 0}
                $
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
