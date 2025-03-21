import { NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";

import Logo from "../../assets/full-logo.png";

import "./main.css";

import { LazyLoadImage } from "react-lazy-load-image-component";

//links
import { multilanguageLinks } from "../../utils/multiLanguages";
import { LanguageContext } from "../../Helper/LanguageContext";
import { useLanguage } from "../../Query";
import UserDropdown from "../../Components/UserDropdown";

function Dashboart() {
  // get Language
  const language = useLanguage();
  const { languageChange, toggleLanguage,cottages } = useContext(LanguageContext);

  return (
    <div>
      <div className="dashboart">
        <div className="dashboart-inner">
          <div className="aside-dashboart w-25">
            <LazyLoadImage
              className="dash-img-logo"
              src={Logo}
              alt="logo"
              effect="blur"
              width={200}
            />
            <hr />
            <div className="link-wrap-dash">
              {multilanguageLinks.map((link) => (
                <NavLink key={link.id} className={`dash-link d-flex justify-content-between align-items-center`} to={link.to}>
                  {link.title[languageChange]}
                  {link.id == 15 && cottages?.length ? <p className="p-0 px-1 m-0 bg-warning rounded-pill">+{cottages?.length}</p>:''}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="main-dashboart">
            <div className="header-dashboart">
              <div className="d-flex justify-content-between w-100">
                <div>
                  <h1 className="fs-4">Admin Panel</h1>
                </div>
                <div className="user-dashboatr-header d-flex align-items-center gap-3">
                  <select
                    name="language"
                    className="form-control fw-medium"
                    onChange={(lang) => toggleLanguage(lang.target.value)}
                    value={languageChange}
                  >
                    {language.data?.length &&
                      language.data.map((e) => {
                        return (
                          <option key={e.id} value={e.code}>
                            {e.code}
                          </option>
                        );
                      })}
                  </select>
                  <UserDropdown />
                </div>
              </div>
            </div>
            <hr />
            <div className="dashboart-main-structure">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboart;
