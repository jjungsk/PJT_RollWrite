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
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { addTag, changeTag, getTagList } from "./admin";
import { toast } from "react-hot-toast";
import AdminPageDialog from "./AdminPageDialog";
import { Tag } from "./type";

function AdminPageTag() {
  const [tagList, setTagList] = useState<Tag[]>();
  const [content, setContent] = useState<string>();
  const [myTag, setMyTag] = useState<Tag>();
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getTagList().then((res) => {
      toast.success(res.message);
      setTagList(res.data);
    });
  }, []);

  const handleClickBtn = () => {
    content &&
      addTag(content).then((res) => {
        toast.success(res.message);
        getTagList().then((res) => {
          toast.success(res.message);
          setTagList(res.data);
        });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setContent(value);
  };

  const handleEditStart = (tagId: string, newContent: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [tagId]: true,
    }));
    setMyTag({ tagId: tagId, content: newContent });
  };

  const handleEditEnd = (tagId: string, content: string) => {
    myTag?.content !== content && setOpen(true);
    setIsEditing((prevState) => ({
      ...prevState,
      [tagId]: false,
    }));
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tagId: string
  ) => {
    const newContent = e.target.value;
    setMyTag({ tagId: tagId, content: newContent });
  };

  const onAgree = () => {
    myTag &&
      changeTag(myTag.content, Number(myTag.tagId)).then((res) => {
        toast.success(res.message);
        getTagList().then((res) => {
          toast.success(res.message);
          setTagList(res.data);
        });
      });
  };

  return (
    <AdminPageWrapper>
      <AdminPageDialog
        open={open}
        setOpen={setOpen}
        title={"태그 내용을 변경하시겠습니까?"}
        onAgree={onAgree}
      />
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
        {tagList?.map((tag) =>
          isEditing[tag.tagId] ? (
            <OutlinedInput
              key={tag.tagId}
              value={myTag?.content}
              onBlur={() => handleEditEnd(tag.tagId, tag.content)}
              onChange={(e) => handleEditChange(e, tag.tagId)}
              autoFocus
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleEditEnd(tag.tagId, tag.content)}
                    edge="end"
                  >
                    <AutoFixHighIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <Chip
              key={tag.tagId}
              color="primary"
              label={tag.content}
              onClick={() => handleEditStart(tag.tagId, tag.content)}
            />
          )
        )}
      </Stack>
    </AdminPageWrapper>
  );
}

export default AdminPageTag;
