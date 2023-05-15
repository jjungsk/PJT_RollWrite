import React, { useEffect, useState } from "react";
import BackNavigation from "../../components/Organism/BackNavigation/BackNavigation";
import { getGroupList } from "../../apis/home";
import { Group } from "../../constants/types";
import { useParams } from "react-router-dom";
import Tabs from "../../components/Molecules/Tabs/Tabs";
import { GroupInfoPageContent } from "./style";
import GroupHome from "../../components/Organism/GroupHome/GroupHome";
import GroupInfo from "../../components/Organism/GroupInfo/GroupInfo";
import GroupQuestion from "../../components/Organism/GroupQuestion/GroupQuestion";
import GroupInvite from "../../components/Organism/GroupInvite/GroupInvite";
import Box from "../../components/Atom/Box/Box";

function GroupInfoPage() {
  const [group, setGroup] = useState<Group>();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);
  const { meetingId } = useParams();
  useEffect(() => {
    getGroupList().then((res) => {
      console.log(res.data);
      // eslint-disable-next-line array-callback-return
      res.data.map((data: Group) => {
        if (data.meetingId === Number(meetingId)) {
          setGroup(data);
        }
      });
    });
  }, [meetingId]);

  return (
    <>
      <BackNavigation
        title={
          group?.title.length! > 18
            ? group?.title.slice(0, 18) + "..."
            : group?.title
        }
        titleSize="16px"
        justifyContent="start"
      />
      <Tabs
        selectedMenuIndex={selectedMenuIndex}
        setSelectedMenuIndex={setSelectedMenuIndex}
      />
      <Box height="16px" width="360px" />
      {group && (
        <GroupInfoPageContent>
          {selectedMenuIndex === 0 && <GroupHome group={group} />}
          {selectedMenuIndex === 1 && <GroupInfo group={group} />}
          {selectedMenuIndex === 2 && (
            <GroupQuestion meetingId={group.meetingId} />
          )}
          {selectedMenuIndex === 3 && <GroupInvite group={group} />}
        </GroupInfoPageContent>
      )}
    </>
  );
}

export default GroupInfoPage;
