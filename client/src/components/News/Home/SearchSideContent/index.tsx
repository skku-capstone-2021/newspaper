import { FC, useState, useEffect } from "react";
import { TextField, Button, InputLabel } from "@material-ui/core";
import Slider from "react-slick";
import TagsInput from "react-tagsinput";
import {
  ContentWrapper,
  SlideWrapper,
  SlideItem,
  ButtonGroup,
} from "./index.style";
import { sendPost } from "@/lib/utils/api";

interface Props {
  sideBarClose: () => void;
  changeMode: (searchData: any) => void;
}

const getToday = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = `0${1 + date.getMonth()}`.slice(-2);
  let day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};

const SearchSideContent: FC<Props> = ({ sideBarClose, changeMode }) => {
  const [loadNewspaper, setLoadNewspaper] = useState<string[]>([]);
  const [loadCategory, setLoadCategory] = useState<string[]>([]);

  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(getToday());
  const [endDate, setEndDate] = useState<string>(getToday());
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

  const fetchData = async () => {
    sendPost("/article/info", {}).then((res) => {
      setLoadNewspaper(res.data.newspapers);
      setLoadCategory(res.data.categorys);
    });
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
    setStartDate(e.target.value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSearch = () => {
    // console.log(title);
    // console.log(startDate);
    // console.log(endDate);
    // console.log(newspaper);
    // console.log(category);
    // console.log(keywords);
    // 유효성 검사

    changeMode({
      title,
      startDate,
      endDate,
      newspaper,
      category,
      keywords,
    });
  };

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
          defaultValue={startDate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleStartChange}
        />
        <TextField
          label="end"
          type="date"
          defaultValue={endDate}
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
