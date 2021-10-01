import { FC, useState, useEffect } from "react";
import { TextField, Button, InputLabel } from "@material-ui/core";
import Slider from "react-slick";
import TagsInput from "react-tagsinput";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tagsinput/react-tagsinput.css";
import {
  ContentWrapper,
  SlideWrapper,
  SlideItem,
  ButtonGroup,
} from "./index.style";

interface Props {
  sideBarClose: () => void;
}

const SearchSideContent: FC<Props> = ({ sideBarClose }) => {
  const [loadNewspaper, setLoadNewspaper] = useState<string[]>([]);
  const [loadCategory, setLoadCategory] = useState<string[]>([]);

  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [newspaper, setNewspaper] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string>("");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const handleChangeKeywords = (e: any) => {
    setKeywords(e.join(","));
  };

  const toggleNewspaper = (selected: string) => {
    if (newspaper.find((item) => item === selected)) {
      setNewspaper(newspaper.filter((item) => item !== selected));
    } else {
      setNewspaper([...newspaper, selected]);
    }
  };

  const toggleCategory = (selected: string) => {
    if (category.find((item) => item === selected)) {
      setCategory(category.filter((item) => item !== selected));
    } else {
      setCategory([...category, selected]);
    }
  };

  const getNewspaper = () => {
    return new Promise((resolve) => {
      resolve([
        "newspaper1",
        "newspaper2",
        "newspaper3",
        "newspaper4",
        "newspaper5",
      ]);
    });
  };

  const getCategory = () => {
    return new Promise((resolve) => {
      resolve([
        "category1",
        "category2",
        "category3",
        "category4",
        "category5",
      ]);
    });
  };

  const fetchData = async () => {
    const response1 = (await getNewspaper()) as string[];
    const response2 = (await getCategory()) as string[];

    setLoadNewspaper(response1);
    setLoadCategory(response2);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      setLoadNewspaper([]);
      setLoadCategory([]);
    };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(new Date(e.target.value));
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(e.target.value));
  };

  const handleSearch = () => {};

  return (
    <ContentWrapper>
      <>
        <TextField
          label="Title"
          fullWidth
          required
          placeholder="Search Title"
          variant="outlined"
          onChange={handleTitleChange}
        />
        <TextField
          label="start"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleStartChange}
        />
        <TextField
          label="end"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleEndChange}
        />
        <div>
          <InputLabel shrink>newspaper</InputLabel>
          <SlideWrapper>
            <Slider {...settings}>
              {loadNewspaper.map((item, index) => (
                <SlideItem
                  className={
                    newspaper.includes(item)
                      ? "slide-selected"
                      : "slide-default"
                  }
                  key={index}
                  onClick={() => {
                    toggleNewspaper(item);
                  }}
                >
                  {item}
                </SlideItem>
              ))}
            </Slider>
          </SlideWrapper>
        </div>
        <div>
          <InputLabel shrink>category</InputLabel>
          <SlideWrapper>
            <Slider {...settings}>
              {loadCategory.map((item, index) => (
                <SlideItem
                  className={
                    category.includes(item) ? "slide-selected" : "slide-default"
                  }
                  key={index}
                  onClick={() => {
                    toggleCategory(item);
                  }}
                >
                  {item}
                </SlideItem>
              ))}
            </Slider>
          </SlideWrapper>
        </div>
        <div>
          <InputLabel shrink>keyword</InputLabel>
          <TagsInput
            value={keywords ? keywords.split(",") : []}
            onChange={handleChangeKeywords}
            inputProps={{
              placeholder: "enter",
            }}
          />
        </div>
        <ButtonGroup>
          <Button
            size="large"
            variant="outlined"
            onClick={() => {
              sideBarClose();
            }}
          >
            cancle
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => {
              handleSearch();
            }}
          >
            search
          </Button>
        </ButtonGroup>
      </>
    </ContentWrapper>
  );
};

export default SearchSideContent;
