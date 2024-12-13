import React, { ChangeEvent, useContext, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AppContext } from "../../App";
import { JOKE_API_URL } from "../../utils/constants";
import { isEmpty } from "lodash";

const categories = [
  "Any",
  "Misc",
  "Programming",
  "Dark",
  "Pun",
  "Spooky",
  "Christmas",
];

interface FilterProps {
  showNav: boolean;
}

const Filters: React.FC<FilterProps> = ({ showNav }) => {
  const [category, setCategory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [jokeNumber, setJokeNumber] = useState<number>(1);
  const { setJokeAPIUrl } = useContext(AppContext)!;

  const handleSelectChange = (event: SelectChangeEvent<typeof category>) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJokeNumber(Number(event.target.value));
  };

  const handleSearch = () => {
    const url =
      JOKE_API_URL +
      (!isEmpty(category) ? category : "Any") +
      "?type=single" +
      (searchTerm ? "&contains=" + searchTerm : "") +
      (jokeNumber ? "&amount=" + jokeNumber : "");

    // https://v2.jokeapi.dev/joke/Programming,Miscellaneous?type=single&contains=cat&amount=5

    // https://v2.jokeapi.dev/joke/Any?type=single

    console.log("url", url);

    setJokeAPIUrl(url);
    clearData();
  };

  const clearData = () => {
    setCategory([]);
    setSearchTerm("");
    setJokeNumber(1);
  };

  return (
    <div
      className={`${showNav ? "block" : "hidden"} mt-[40%] flex-col lg:block`}
    >
      <div className="flex flex-row gap-2 ml-5">
        <FilterAltIcon className=""></FilterAltIcon>
        <p className="text-lg font-semibold">Joke Filters</p>
      </div>
      <hr className="border border-gray-300 m-3"></hr>

      <div className="flex flex-col font-inter font-bold items-center p-2 mt-5">
        <div className="flex flex-col gap-10 w-[90%] p-0">
          <FormControl sx={{ m: 0 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={category}
              onChange={handleSelectChange}
              input={
                <OutlinedInput label="Select Category" className="text-black" />
              }
              renderValue={(selected) => selected.join(", ")}
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item} className="h-10">
                  <Checkbox checked={category.includes(item)} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Search String"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <TextField
            id="filled-number"
            label="Number of Jokes"
            type="number"
            variant="outlined"
            value={jokeNumber}
            onChange={handleNumberChange}
          />
        </div>
        <Button
          variant="outlined"
          size="medium"
          className="w-fit"
          disabled={!category && !searchTerm && !jokeNumber}
          onClick={handleSearch}
          sx={{
            backgroundColor: "#155eef",
            color: "white",
            "&:hover": {
              backgroundColor: "#104db8",
            },
            "&:disabled": {
              color: "rgba(0, 0, 0, 0.26)",
              backgroundColor: "rgba(0, 0, 0, 0.12)",
            },
            marginTop: "2rem",
            textTransform: "capitalize",
          }}
        >
          Search Jokes
        </Button>
      </div>
    </div>
  );
};

export default Filters;
