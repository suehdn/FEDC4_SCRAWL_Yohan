import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteArticle } from "@apis/article/deleteArticle";

export const useArticleDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticle,
    onSuccess: (article) =>
      Promise.all([
        queryClient.resetQueries(["articles", article.channel]),
        queryClient.invalidateQueries(["user-by-token"])
      ])
  });
};
