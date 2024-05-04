import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Box,
} from "@mui/material";

import "../assets/css/jobCard.css";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

function JobCard({
  companyName,
  jobDetailsFromCompany,
  jobRole,
  location,
  minExp,
  logoUrl,
  maxJdSalary,
  minJdSalary,
  salaryCurrencyCode = "",
}) {
  const shortDescription = jobDetailsFromCompany?.slice(0, 300) + "...";
  const [description, setDescription] = useState(shortDescription);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    if (isExpanded) {
      setDescription(shortDescription);
    } else {
      setDescription(jobDetailsFromCompany);
    }
    setIsExpanded(!isExpanded);
  };

  const handleSalaryValue = (min, max) => {
    if (min && max) {
      return `${min}k - ${max}k ${salaryCurrencyCode}`;
    } else if (min) {
      return `${min}k ${salaryCurrencyCode}`;
    } else if (max) {
      return `${max}k ${salaryCurrencyCode}`;
    }
  };

  return (
    <Card className="jobcard" variant="outlined">
      <CardContent>
        <Chip label="⏳ Posted 10 days ago" variant="outlined" />
        <Grid className="card__content" container>
          {logoUrl && (
            <Grid item xs={2.5}>
              <img src={logoUrl} alt="company logo" className="company__logo" />
            </Grid>
          )}
          <Grid item xs={8}>
            <Typography variant="h5" component="h2">
              {companyName || "companyName"}
            </Typography>
            {jobRole && (
              <Typography color="textSecondary">
                {capitalizeFirstLetter(jobRole)}
              </Typography>
            )}
            {location && (
              <Typography variant="body2" component="p">
                {capitalizeFirstLetter(location)}
              </Typography>
            )}
          </Grid>
        </Grid>
        {(minJdSalary || maxJdSalary) && (
          <Typography variant="subtitle1" gutterBottom>
            Estimated Salary: {handleSalaryValue(minJdSalary, maxJdSalary)}
          </Typography>
        )}
        {description && (
          <>
            <Typography variant="subtitle1" className="about__company">
              About Company:
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              <strong>About us</strong>
            </Typography>
            <Typography
              variant="body2"
              className={`${isExpanded ? "" : "mask__image"}`}
              component="p"
              gutterBottom
            >
              {description}
            </Typography>
            <Box className="job-card-description-more">
              <span className="show__more" onClick={toggleDescription}>
                {isExpanded ? "Show Less" : "Show More"}
              </span>
            </Box>
          </>
        )}

        {minExp && (
          <>
            <Typography color="textSecondary">Minimum Experience</Typography>
            <Typography variant="body2" component="p" gutterBottom>
              {minExp} years
            </Typography>
          </>
        )}
        <Button className="easy__apply" variant="contained" color="primary">
          ⚡ Easy Apply
        </Button>
        <Button className="referral__ask" variant="contained" color="secondary">
          Unlock referral asks
        </Button>
      </CardContent>
    </Card>
  );
}

export default JobCard;
