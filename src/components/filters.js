import { useSelector } from "react-redux";
import "../assets/css/filters.css";
import SelectComponent from "./selectComp";

const Filters = () => {
  const MinimumExperienceData = [
    ...Array(20)
      .fill("")
      .map((_, index) => 1 + index),
  ];
  const MinimumBasePay = [
    ...Array(15)
      .fill("")
      .map((_, index) => 10 * (index + 1)),
  ];

  const roles = ["Front end", "Back end"];
  const isItRemote = ["Remote", "On-site"];
  return (
    <div className="filter__main">
      <SelectComponent
        type="Roles"
        multiSelect
        name="jobRole"
        filterData={[...roles]}
      />
      <SelectComponent
        type="Locations"
        name="location"
        multiSelect
        filterData={[...roles]}
      />
      <SelectComponent
        type="Minimum Experience"
        name="minExp"
        filterData={MinimumExperienceData}
      />
      <SelectComponent
        type="Minimum Base Pay in K USD"
        payAmount
        name="minJdSalary"
        filterData={MinimumBasePay}
      />
      <SelectComponent name="remote" type="Remote" filterData={isItRemote} />
    </div>
  );
};

export default Filters;
