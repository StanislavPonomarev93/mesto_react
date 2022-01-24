<h2 style="text-align:center; color: #f2a44b; font-size: 30px">Mesto (React)</h2>
<p style="text-align:center; font-size: 18px; color: #0f8755">Интерактивный проект по созданию карточек</p>
<h2 align="center"><a  href="https://stanislavponomarev93.github.io/mesto_react/">Live Demo</a></h2>
<p>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
</p>

___

<h2 style="color: #f2a44b; font-size: 25px; line-height: 50px">Описание</h2>

<p style="font-size: 20px; margin: 50px 0 20px 20px">Редактирование пользователя</p>

<p align="center"><img src="./src/readmeData/gif.gif" width="60%"></p>

Запрос на редактирование отправляется в `http://nomoreparties.co/cohort12/users/me`. Ответ сохраняется в глобальном стейте `userData`

```TypeScript
export const fethcEditUser = createAsyncThunk(
  'userData/fethcEditUser',
  function (data: UserType) {
    return mestoApi.sendUserInfo(data.name, data.about).then(res => res);
  }
);

builder.addCase(fethcEditUser.fulfilled, (state, action) => {
  state.userData = action.payload;
  state.button = true;
});
```

<p style="font-size: 20px; margin: 50px 0 20px 20px">Изменение аватара</p>

<p align="center"><img src="./src/readmeData/gif.gif" width="60%"></p>

Запрос на редактирование отправляется в `http://nomoreparties.co/cohort12/users/me/avatar`. Ответ сохраняется в глобальном стейте `userData`.

```TypeScript
export const fethcEditUserAvatar = createAsyncThunk(
  'userData/fethcEditUserAvatar',
  function (data: UserType) {
    return mestoApi.changeAvatar(data.avatar).then(res => res);
  }
);

builder.addCase(fethcEditUserAvatar.fulfilled, (state, action) => {
  state.userData = action.payload;
  state.button = true;
});
```

<p style="font-size: 20px; margin: 50px 0 20px 20px">Создание новой карточки</p>

<p align="center"><img src="./src/readmeData/gif.gif" width="60%"></p>

POST запрос на добавление новой карточки отправляется в `http://nomoreparties.co/cohort12/cards`. Ответ добавляется в массив уже созданных карточек, которые хранятся в глобальном стейте `cards`.

```TypeScript
export const fethcAddCard = createAsyncThunk(
  'cards/fethcAddCard',
  function (element: CardType) {
    return mestoApi.addCard(element.name, element.link).then((res) => res);
  }
);

builder.addCase(fethcAddCard.fulfilled, (state, action) => {
  state.cards = [...state.cards, action.payload];
  state.button = true;
});
```

<p style="font-size: 20px; margin: 50px 0 20px 20px">Удаление карточки</p>

<p align="center"><img src="./src/readmeData/gif.gif" width="60%"></p>

Удаление карточки происходит через запрос DELETE `http://nomoreparties.co/cohort12/cards/cardId`. После ответа карточка удаляется из массива глобального стейта `cards`.

```TypeScript
export const fethcDeleteCard = createAsyncThunk(
  'cards/fethcDeleteCard',
  function (element: CardType) {
    return mestoApi.deleteCard(element._id).then(() => element);
  }
);

builder.addCase(fethcDeleteCard.fulfilled, (state, action) => {
  state.cards = state.cards.filter((el: { _id: string; }) => el._id !== action.payload._id)
});
```

<p style="font-size: 20px; margin: 50px 0 20px 20px">Like карточки</p>

<p align="center"><img src="./src/readmeData/gif.gif" width="60%"></p>

Добавление лайка и удаление отпраляется по url `http://nomoreparties.co/cohort12/cards/like/cardId`. Реализация вынесена в кастомный хук `useLike`.

```TypeScript
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
```

<p style="font-size: 20px; margin: 50px 0 20px 20px">Увеличение картинки</p>

<p align="center">
<img  src="./src/readmeData/image1.png" width="30%">
<img  src="./src/readmeData/image2.png" width="30%">
</p>

```TypeScript
// Добавляется ссылка картинки в созданный попап
<img src={props.link} alt="" className="popup__image-big" />
```

<h2 style="color: #f2a44b; font-size: 25px; line-height: 50px">Локальный запуск проекта</h2>

```
git clone https://stanislavponomarev93.github.io/mesto_react

npm install

npm start
```