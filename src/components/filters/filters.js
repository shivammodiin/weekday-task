import { useSelector } from "react-redux";
import "../../assets/css/filters.css";
import SelectComponent from "./selectComp";
import TextFieldComponent from "./textComp";

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

  const filterData = useSelector((state) => state.posts.filtersOption);
  const isItRemote = ["Remote", "On-site"];
  if (!filterData.locations) return;
  return (
    <div className="filter__main">
      <SelectComponent
        type="Roles"
        multiSelect
        name="jobRole"
        filterData={[...filterData.roles]}
      />
      <SelectComponent
        type="Locations"
        name="location"
        multiSelect
        filterData={[...filterData.locations]}
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
      <TextFieldComponent type="Company Name" name="companyName" />
    </div>
  );
};

export default Filters;
