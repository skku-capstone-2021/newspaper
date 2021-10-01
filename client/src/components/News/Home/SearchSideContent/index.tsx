import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { TextField, Button, InputLabel } from "@material-ui/core";
import Slider from "react-slick";
import TagsInput from "react-tagsinput";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tagsinput/react-tagsinput.css";
import Loading from "@/components/Common/Loading";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const SlideWrapper = styled.div`
  margin-top: 1rem;
  padding: 0 1.5rem;
`;

const SlideItem = styled.div`
  height: 100%;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const SearchSideContent: FC = () => {
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
    const idx = newspaper.find((item) => item === selected);
    if (idx) {
      setNewspaper(newspaper.filter((item) => item !== selected));
    } else {
      setNewspaper([...newspaper, selected]);
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

  return (
    <ContentWrapper>
      <>
        <TextField
          label="Title"
          fullWidth
          required
          placeholder="Search Title"
          variant="outlined"
        />
        <TextField
          label="start"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="end"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
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
                <SlideItem key={index}>{item}</SlideItem>
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
          <Button size="large" variant="outlined">
            cancle
          </Button>
          <Button size="large" variant="outlined" color="primary">
            search
          </Button>
        </ButtonGroup>
      </>
    </ContentWrapper>
  );
};

export default SearchSideContent;
