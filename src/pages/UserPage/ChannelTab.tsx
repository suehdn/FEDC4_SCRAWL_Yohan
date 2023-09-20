import Flex from "@components/atoms/Flex";

import { useChannelsQuery } from "@hooks/api/useChannelsQuery";

import { useThemeStore } from "@stores/theme.store";

import { getChannelItemStyle, getChannelTabStyle } from "./UserPage.style";

type ChannelListProps = {
  handleUpdateCurrentChannel: (id: string) => void;
  currentChannel: string;
};

const ChannelList = ({
  handleUpdateCurrentChannel,
  currentChannel
}: ChannelListProps) => {
  const theme = useThemeStore((state) => state.theme);
  const { channels } = useChannelsQuery();

  const channelsPlus = [
    {
      posts: [],
      _id: "all",
      name: "all",
      description: "all",
      createdAt: "",
      updatedAt: ""
    },
    ...channels
  ];

  return (
    <Flex justify="center" css={getChannelTabStyle(theme)}>
      {channelsPlus.map((item) => (
        <Flex
          onClick={() => handleUpdateCurrentChannel(item._id)}
          align="center"
          css={getChannelItemStyle(theme, item, currentChannel)}
          key={item._id}>
          {item.name}
        </Flex>
      ))}
    </Flex>
  );
};

export default ChannelList;
