import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';

const Table = (props) => {
  const { actionsCourse, actionsDelete, actionsEdit, tableHeadAction, tableHeadcol, tableHeadName, tableHeadId, data, pagename} = props;
  const [searchInitial, setSearchInitial] = useState({ username: '' });
  const [filteredData, setFilteredData] = useState(data);
  const [selectall, setselectall] = useState(true);
  const totalEntries = filteredData.length;
  const [initialIndex, setInitialIndex] = useState(0);
  const [initialIndexPre, setInitialIndexPre] = useState(0);
  const [finalIndex, setFinalIndex] = useState(8);
  const [finalIndexPre, setFinalIndexPre] = useState(0);
  const [count,setCount]=useState(1)

  const dataArray = filteredData.slice(initialIndex, finalIndex);
  const lastIndex = data[filteredData.length - 1]?.id;


  const handlePrevious = () => {
    if (initialIndex > 0) {
      if (initialIndex + 8 > lastIndex) {
        setInitialIndex(initialIndexPre);
        setFinalIndex(finalIndexPre);
        setCount(count-1)
      } else {
        setInitialIndex(initialIndex - 8);
        setFinalIndex(finalIndex - 8);
        setCount(count-1)

      }
    }
  };

  const handleNext = () => {
    if (finalIndex < totalEntries) {
      if (finalIndex + 8 > lastIndex) {
        setFinalIndexPre(finalIndex);
        setInitialIndexPre(initialIndex);
        setFinalIndex(lastIndex);
        setInitialIndex(initialIndex + 8);
        setCount(count+1)
      } else {
        setInitialIndex(initialIndex + 8);
        setFinalIndex(finalIndex + 8);
        setCount(count+1)
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchInitial((prev) => ({ ...prev, [name]: value }));

    const filteredResults = data.filter((course) => {
      const Susername = course.username.toLowerCase();
      const Semail = course.email.toLowerCase();
      return Susername.includes(value.toLowerCase()) || Semail.includes(value.toLowerCase());
    });

    setFilteredData(filteredResults);
    setInitialIndex(0);
    setFinalIndex(8);
    setCount(1)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handelcheck =()=>{
    if (selectall === true) {
      setselectall(false)
    } else {
      setselectall(true)
    }
  }


  const handelExports=()=>{
    if (selectall === true) {
      toast(`Kindly Check the Check box`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    } else {
      const wb = XLSX.utils.book_new();
      const datas = data.map(user => [user.id, user.username, user.email]);
      const ws = XLSX.utils.aoa_to_sheet([[`${tableHeadId}`, `${tableHeadName}`, `${tableHeadcol}`], ...datas]);
      XLSX.utils.book_append_sheet(wb, ws, "Users");
      XLSX.writeFile(wb, `${pagename}.xlsx`);
    }
  }

  return (
    <>
      <div className="lg:h-[100%] lg:w-[100%] lg:flex lg:justify-center lg:items-center">
        <div className="lg:h-[95%] lg:w-[95%] lg:flex lg:justify-between lg:items-center lg:flex-col">
          <div className="lg:h-[10%] lg:w-[100%] lg:flex lg:justify-between lg:items-center">
            <form className="lg:bg-slate-300 lg:h-[35px] lg:w-[350px] lg:flex lg:justify-between lg:items-center lg:rounded-3xl lg:p-2" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search Here"
                onChange={handleChange}
                name="username"
                value={searchInitial.username}
                className="lg:bg-slate-300 lg:h-[25px] lg:w-[90%] lg:rounded-3xl lg:p-3 lg:border-none lg:outline-slate-300"
              />
              <button className="lg:flex lg:justify-center lg:items-center lg:w-[10%] lg:outline-none lg:border-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <button className="lg:bg-gray-800 lg:p-1 lg:flex lg:justify-center lg:items-center lg:w-[100px] lg:rounded-3xl lg:text-white hover:bg-slate-300 hover:text-slate-900 lg:font-serif" onClick={handelExports}>
              Export
            </button>
          </div>
          <div className="lg:h-[70%] lg:w-[100%]">
            <table className="lg:border-separate lg:rounded-3xl lg:h-auto lg:w-[100%] lg:text-center lg:overflow-hidden">
              <thead className="lg:h-[10%] lg:w-[90%] lg:bg-gray-500">
                <tr className="lg:border">
                  <th className="lg:p-3 mr-3">
                    <input type="checkbox" onClick={handelcheck}/> {tableHeadId}
                  </th>
                  <th className="lg:p-3">{tableHeadName}</th>
                  <th className="lg:p-3">{tableHeadcol}</th>
                  <th className="lg:p-3">{tableHeadAction}</th>
                </tr>
              </thead>
              <tbody className="overflow-hidden">
                {totalEntries > 0 ? (
                  dataArray.map((item) => (
                    <tr key={item.id} className={`lg:bg-gray-300`}>
                      <td className="lg:p-1">{item.id}</td>
                      <td className="lg:p-1">{item.username}</td>
                      <td className="lg:p-1">{item.email}</td>
                      <td className="lg:inline-flex lg:items-center lg:justify-center lg:space-x-4 lg:p-1">
                        <div className="lg:bg-green-700 lg:p-1 lg:w-[70px] lg:rounded-full lg:text-white hover:bg-green-600 hover:text-slate-800 lg:cursor-pointer lg:font-serif">
                          {actionsEdit}
                        </div>
                        <div className="lg:bg-red-600 lg:p-1 lg:w-[70px] lg:rounded-full lg:text-white hover:bg-red-500 hover:text-slate-800 lg:cursor-pointer lg:font-serif">
                          {actionsDelete}
                        </div>
                        {actionsCourse && (
                          <div className="lg:bg-blue-600 lg:p-1 lg:w-[70px] lg:rounded-full lg:text-white hover:bg-blue-500 hover:text-slate-800 lg:cursor-pointer lg:font-serif">
                            {actionsCourse}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="lg:p-36">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="lg:h-[15%] lg:w-[100%] lg:flex lg:justify-end lg:items-center">
            <div className="lg:h-[100%] lg:w-[50%] lg:flex lg:justify-end lg:items-center">
              <p>
                {initialIndex + 1} - {Math.min(finalIndex, totalEntries)} of {totalEntries}
              </p>
              <div className="lg:ml-6 lg:flex">
                <button onClick={handlePrevious} disabled={initialIndex === 0}>
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    className="hover:text-slate-300 cursor-pointer lg:text-xl"
                  />
                </button>
                <div className={`lg:ml-3`}>{count}</div>
                <button onClick={handleNext} disabled={finalIndex >= totalEntries}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="lg:ml-3 hover:text-slate-300 cursor-pointer lg:text-xl"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
      </div>
    </>
  );
};

export default Table;
