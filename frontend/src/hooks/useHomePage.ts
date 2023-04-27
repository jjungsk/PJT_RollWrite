import { useState } from "react";
import { Question } from "../constants/types";
import { getGroupList } from "../apis/home";

function useGroupList() {
  const [groupList, setGroupList] = useState<Question[]>();

  getGroupList()
    .then((res) => {
      console.log(res);
      setGroupList(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
  return groupList;
}

export default useGroupList;
