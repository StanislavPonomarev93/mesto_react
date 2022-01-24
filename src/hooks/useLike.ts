import { useState } from "react";
import { mestoApi } from "../components/utils/api";
import { CardType } from "../types/types";
import { useAppSelector } from "./hooks";

function useLike(element: CardType): [{ likes: number, liked: boolean }, () => void] {
  const { userData } = useAppSelector(state => state.userData);
  const [likeData, setLikeData] = useState({
    likes: element.likes.length,
    liked: element.likes.some((i) => i._id === userData._id)
  });

  const editLike = () => {
    likeData.liked && mestoApi.deleteLike(element._id).then((res) => setLikeData({
      likes: res.likes.length,
      liked: false
    }));
    !likeData.liked && mestoApi.setLike(element._id).then((res) => setLikeData({
      likes: res.likes.length,
      liked: true
    }));
  }

  return [likeData, editLike];
}
export { useLike };