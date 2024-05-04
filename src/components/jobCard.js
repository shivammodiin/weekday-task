import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import "../assets/css/jobCard.css";

import CompanyLogo from "../assets/images/company_logo.svg";

function JobCard() {
  return (
    <Card className="jobcard" variant="outlined">
      <CardContent>
        <Chip label="⏳ Posted 10 days ago" variant="outlined" />
        <Grid className="card__content" container>
          <Grid item xs={2.5}>
            <img
              src={CompanyLogo}
              alt="company logo"
              className="company__logo"
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" component="h2">
              NextVita
            </Typography>
            <Typography color="textSecondary">Front End Developer</Typography>
            <Typography variant="body2" component="p">
              Mumbai
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          Estimated Salary: 3K ✅
        </Typography>
        <Typography variant="subtitle1" className="about__company">
          About Company:
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          <strong>About us</strong>
        </Typography>
        <Typography variant="body2" className="desciption" component="p">
          Description
        </Typography>

        <Typography color="textSecondary">Minimum Experience</Typography>
        <Typography variant="body2" component="p" gutterBottom>
          10 years
        </Typography>
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
