import { FaRegCircleUser } from "react-icons/fa6";
import { useSingleUser } from "../Query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMG_BASE_URL } from "../constants/img.constants";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiLogOut } from "react-icons/bi";

const UserDropdown = () => {
  const getSingleUSer = useSingleUser();

  const navigate = useNavigate();

  // log out function
  const handLogOut = () => {
    toast.success("successfully log out");
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="dropdown-center">
      <button
        className="UserDropDownBtn"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {getSingleUSer?.data?.image !== "" ? (
          <LazyLoadImage
            className="userImg"
            src={`${IMG_BASE_URL}${getSingleUSer?.data?.image}`}
            effect="blur"
            height={40}
          />
        ) : (
          <FaRegCircleUser size={30} />
        )}
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link to={"profile"} className="dropdown-item" href="#">
            My Profile
          </Link>
        </li>
        <li>
          <button
            className="dropdown-item bg-danger text-white rounded d-flex gap-2 align-items-center"
            href="#"
            onClick={handLogOut}
          >
            <span>
              <BiLogOut size={22} />
            </span>
            <span>Log Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
