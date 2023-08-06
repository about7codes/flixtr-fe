import React from "react";
import { styles as classes } from "./filter.styles";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { IConutry, countries, getYears } from "../../utils/filterUtils";

type FilterProps = {
  releaseYear: number | "";
  country: IConutry | undefined;
  setReleaseYear: React.Dispatch<React.SetStateAction<number | "">>;
  setCountry: React.Dispatch<React.SetStateAction<IConutry | undefined>>;
};

const Filter = ({
  country,
  setCountry,
  releaseYear,
  setReleaseYear,
}: FilterProps) => {
  const handleYearChange = (event: SelectChangeEvent) => {
    setReleaseYear(event.target.value as unknown as number);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCountry = countries.find(
      (country) => country.code === event.target.value
    );

    setCountry(selectedCountry);
  };

  return (
    <Grid container sx={classes.filter}>
      <Grid item>
        <FormControl
          fullWidth
          size="small"
          color="secondary"
          sx={classes.selectMain}
        >
          <InputLabel sx={classes.selectLabel} id="country-select-label">
            Country
          </InputLabel>
          <Select
            color="secondary"
            labelId="country-select-label"
            id="country-select"
            value={country?.code || ""}
            label="Country"
            onChange={handleChange}
            sx={classes.select}
            MenuProps={{
              sx: classes.selectMenu,
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {countries.map(({ name, code, langCode }) => (
              <MenuItem key={code} value={code}>
                {`${name} (${langCode})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item>
        <FormControl
          fullWidth
          size="small"
          color="secondary"
          sx={classes.selectMain}
        >
          <InputLabel sx={classes.selectLabel} id="year-select-label">
            Year
          </InputLabel>
          <Select
            color="secondary"
            labelId="year-select-label"
            id="year-select"
            value={`${releaseYear}`}
            label="Year"
            onChange={handleYearChange}
            sx={classes.select}
            MenuProps={{
              sx: classes.selectMenu,
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getYears().map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filter;
