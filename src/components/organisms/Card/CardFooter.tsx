import { useNavigate } from "react-router-dom";

import { css } from "@emotion/react";

import Flex from "@components/atoms/Flex";
import Text from "@components/atoms/Text";
import IconText from "@components/molecules/IconText";

import { useThemeStore } from "@stores/theme.store";

import {
  Article,
  articleTitleDataToArticleContent
} from "@type/models/Article";

import { PATH } from "@constants/index";

import { Like, Message } from "@assets/svg";

import {
  cardDescriptionStyle,
  cardFoorterOuterStyle,
  contentStyle,
  titleStyle
} from "./CardFooter.styles";
import Tags from "./Tags";

type CardFooterProps = {
  article: Article;
};

const CardFooter = ({ article }: CardFooterProps) => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  const { title, content, tags } = articleTitleDataToArticleContent(
    article.title
  );

  return (
    <Flex direction="column" gap={8} css={cardFoorterOuterStyle}>
      <Flex
        direction="column"
        gap={8}
        css={cardDescriptionStyle}
        onClick={() => navigate(PATH.ARTICLE(article._id))}>
        <Text size={16} strong={true} css={titleStyle}>
          {title}
        </Text>
        <Text size={14} css={contentStyle}>
          {content}
        </Text>
      </Flex>

      <Tags tags={tags} />

      <Text
        size={12}
        color={theme.type === "DARK" ? theme.TEXT100 : theme.TEXT300}>
        {new Date(article.createdAt).toLocaleDateString()}
      </Text>

      <Flex
        justify="space-between"
        css={css`
          width: 100%;
        `}>
        <IconText
          iconValue={{ Svg: Like, fill: theme.TEXT300, size: 16 }}
          textValue={{
            children: article.likes.length,
            size: 12,
            color: theme.TEXT300
          }}
          css={css`
            gap: 5px;
          `}
        />
        <IconText
          iconValue={{ Svg: Message, fill: theme.TEXT300, size: 16 }}
          textValue={{
            children: article.comments.length,
            size: 12,
            color: theme.TEXT300
          }}
          css={css`
            gap: 5px;
          `}
        />
      </Flex>
    </Flex>
  );
};

export default CardFooter;
