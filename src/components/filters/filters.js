import { useSelector } from "react-redux";
import "../../assets/css/filters.css";
import SelectComponent from "./selectComp";
import TextFieldComponent from "./textComp";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const Filters = () => {
  const MinimumExperienceData = [
    ...Array(20)
      .fill("")
      .map((_, index) => ({
        label: `${index + 1} years`,
        value: index + 1,
      })),
  ];
  const MinimumBasePay = [
    ...Array(15)
      .fill("")
      .map((_, index) => ({
        label: `${(index + 1) * 10}K USD`,
        value: (index + 1) * 10,
      })),
  ];

  const filterData = useSelector((state) => state.posts.filtersOption);

  if (!filterData.locations) return;
  const remoteOptions = ["remote", "on-site"].map((rValue) => ({
    label: capitalizeFirstLetter(rValue),
    value: rValue,
  }));

  const rolesOptions = [...filterData.roles].map((role) => ({
    label: capitalizeFirstLetter(role),
    value: role,
  }));
  const locationsOptions = [...filterData.locations].map((location) => ({
    label: capitalizeFirstLetter(location),
    value: location,
  }));
  return (
    <div className="filter__main">
      <SelectComponent
        type="Roles"
        multiSelect
        name="jobRole"
        filterData={rolesOptions}
      />
      <SelectComponent
        type="Locations"
        name="location"
        multiSelect
        filterData={locationsOptions}
      />
      <SelectComponent
        type="Minimum Experience"
        name="minExp"
        filterData={MinimumExperienceData}
      />
      <SelectComponent
        type="Minimum Base Pay"
        payAmount
        name="minJdSalary"
        filterData={MinimumBasePay}
      />
      <SelectComponent name="remote" type="Remote" filterData={remoteOptions} />
      <TextFieldComponent type="Company Name" name="companyName" />
    </div>
  );
};

export default Filters;
