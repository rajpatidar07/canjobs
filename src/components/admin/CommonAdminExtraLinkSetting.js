// pages/CommonAdminExtraLinkSetting.js
import React, { useState } from 'react';
import {
  FaFilter,
  FaBriefcase,
  FaUserFriends,
  FaKey,
  // FaClock,
  // FaPhone,
} from 'react-icons/fa';
import FilterList from './filterList';
import Category from './category';
import ManageApplicantType from './MangeApplicantType';
import Credentional from './Credentional';
// import ManageHourlyLog from './ManageHourlyLog';
// import ManageDailyCallLog from './ManageDailyCallLog';

const CommonAdminExtraLinkSetting = () => {
  const admin_type = localStorage.getItem('admin_type');
  const [activeTab, setActiveTab] = useState('Filter List');

  const settingsOptions = [
    {
      name: 'Manage Applicant Type',
      component: <ManageApplicantType />,
      icon: <FaUserFriends />,
      visible: admin_type === 'super-admin',
    },
    // { name: 'Daily Hour Log', component: <ManageHourlyLog />, icon: <FaClock /> },
    // { name: 'Daily Call Log', component: <ManageDailyCallLog />, icon: <FaPhone /> },
    { name: 'Filter List', component: <FilterList />, icon: <FaFilter /> },
    { name: 'Job Category', component: <Category />, icon: <FaBriefcase /> },
    {
      name: 'Credentials',
      component: <Credentional />,
      icon: <FaKey />,
      visible: admin_type === 'super-admin',
    },
  ];

  const visibleTabs = settingsOptions.filter((item) => item.visible !== false);

  return (
    <div className="overflow-hidden bg-default-2 ">
      {/* Tab Buttons */}
      <div className="d-flex flex-column flex-md-row mt-3 mt-md-15 mx-2 mx-md-5" role="group" aria-label="Tab Options">
        {visibleTabs.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className={`btn mb-2 mb-md-0 mr-md-2 ${
              activeTab === item.name ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={() => setActiveTab(item.name)}
          >
            {item.icon} <span className="mx-2">{item.name}</span>
          </button>
        ))}
      </div>
        {visibleTabs.find((item) => item.name === activeTab)?.component}
    </div>
  );
};

export default CommonAdminExtraLinkSetting;
