import React, { useEffect, useState } from "react";
import { AdminPageWrapper } from "./style";
import {
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addTag, getTag } from "./admin";
import { toast } from "react-hot-toast";
import { height } from "@mui/system";

interface Tag {
  tagId: string;
  content: string;
}
function AdminPageTag() {
  const [tagList, setTagList] = useState<Tag[]>();
  const [content, setContent] = useState<string>();

  useEffect(() => {
    getTag().then((res) => {
      toast.success(res.message);
      setTagList(res.data);
    });
  }, []);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleClickBtn = () => {
    content &&
      addTag(content).then((res) => {
        toast.success(res.message);
        setTagList(res.data);
        getTag().then((res) => {
          toast.success(res.message);
          setTagList(res.data);
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setContent(value);
  };

  return (
    <AdminPageWrapper>
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          maxWidth: 720,
          margin: "auto",
          marginBottom: "16px",
        }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">태그 추가</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickBtn}
                edge="end"
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: "100%",
          maxWidth: 720,
          margin: "auto",
          flexWrap: "wrap",
          rowGap: "16px",
        }}
      >
        {tagList?.map((tag) => (
          <Chip
            key={tag.tagId}
            color="primary"
            label={tag.content}
            onClick={handleClick}
          />
        ))}
      </Stack>
    </AdminPageWrapper>
  );
}

export default AdminPageTag;
