import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import Button from "@components/atoms/Button";
import Flex from "@components/atoms/Flex";

import { useArticleCreateMutation } from "@hooks/api/useArticleCreateMutation";
import { useError } from "@hooks/useError";
import { useLoggedIn } from "@hooks/useLoggedIn";

import { useThemeStore } from "@stores/theme.store";

import { articleContentToArticleTitleData } from "@type/models/Article";

import { AuthError } from "@utils/AuthError";

import ArticleChannelSelect from "./ArticleChannelSelect";
import ArticleEditor from "./ArticleEditor";
import ArticleTag from "./ArticleTag";
import ArticleTitle from "./ArticleTitle";

const ArticleWrite = () => {
  const navigate = useNavigate();
  const { mutate } = useArticleCreateMutation();
  const { dispatchError } = useError();
  const { isLoggedIn } = useLoggedIn();
  const [channelId, setChannelId] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const { theme } = useThemeStore();

  if (!isLoggedIn) dispatchError(new AuthError("로그인이 필요합니다."));

  const navigatePage = (page: string) => {
    switch (page) {
      case "CHANNEL":
        return navigate(`/channels/${channelId}`);
      case "BACK":
        return navigate(-1);
    }
  };
  const width = "70%";

  const ArticleWriteButton = css`
    margin-top: 10px;
    width: ${width};
    :hover {
      cursor: pointer;
    }
  `;

  const handleCreateButtonClick = () => {
    if (title && channelId) {
      mutate({
        title: articleContentToArticleTitleData({
          title,
          content,
          tags
        }),
        channelId: channelId
      });
      navigatePage("CHANNEL");
    } else {
      toast.error("채널 선택과 제목 입력은 필수사항입니다.");
    }
  };
  return (
    <Flex
      direction="column"
      css={css`
        margin: 20px;
      `}>
      <ArticleChannelSelect stateChange={(value) => setChannelId(value)} />
      <ArticleTitle stateChange={(value) => setTitle(value)} width={width} />
      <ArticleTag stateChange={(value) => setTags(value)} width={width} />
      <ArticleEditor stateChange={(value) => setContent(value)} width={width} />
      <Flex css={ArticleWriteButton} justify="space-between">
        <Button
          background="none"
          children="나가기"
          width="50px"
          height="30px"
          color={theme.TEXT600}
          onClick={() => navigatePage("BACK")}></Button>
        <Button
          children="완료"
          width="50px"
          height="30px"
          color={theme.TEXT100}
          onClick={handleCreateButtonClick}></Button>
      </Flex>
    </Flex>
  );
};

export default ArticleWrite;
