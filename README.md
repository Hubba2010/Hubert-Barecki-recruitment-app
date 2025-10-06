# Aplikacja rekrutacyjna - Posts App

Lista postów z filtrami i dodawaniem do ulubionych

## 📁 Struktura katalogów

<img width="298" height="396" alt="image" src="https://github.com/user-attachments/assets/de49aba8-3113-471d-9f54-1bb81f89ad54" />



---

## 🧩 Komponenty

| Komponent | Lokalizacja | Opis |
|------------|-------------|------|
| **PostListComponent** | `feature/post-list` | Główny widok listy postów z filtrami (formularz + lista). |
| **PostItemComponent** | `shared/components/post-item` | Pojedynczy post z możliwością rozwinięcia komentarzy i oznaczenia jako ulubiony. |
| **SearchBarComponent (opcjonalny)** | `shared/components/search-bar` | Potencjalny komponent do wyszukiwania globalnego lub filtracji. |

---

## 🧰 Serwisy (API)

| Serwis | Lokalizacja | Odpowiedzialność |
|---------|-------------|------------------|
| **PostsApiService** | `core/api/posts-api.service.ts` | Obsługuje komunikację z endpointami `https://jsonplaceholder.typicode.com/posts` i komentarzami (`/comments`). |
| **UsersApiService** | `core/api/users-api.service.ts` | Pobiera listę użytkowników z `https://jsonplaceholder.typicode.com/users`. |

---

## 🧮 Zarządzanie stanem

### Stores:

#### `UsersStore`
- Przechowuje listę użytkowników.
- Metoda `loadUsers()` – pobiera dane z API tylko raz.
- Udostępnia sygnał `usersList`.

#### `PostsStore`
- Zarządza postami oraz stanem ulubionych.
- Metoda `fetchPosts(userId?: number)` – pobiera posty z API (z query param).
- Metoda `toggleFavorite(postId)` – dodaje/usuwa post z ulubionych.
- Sygnały:
  - `postsList`
  - `favorites`
  - `loading` (dla spinnera)
- Zawiera logikę do pobierania komentarzy (`getCommentsByPostId()`).

---

## 🧱 Podejście do zarządzania stanem

- Każdy store jest **singletonem (`providedIn: 'root'`)**.
- Używane są **Angular Signals** oraz **RxJS operators** (`tap`, `switchMap`, `takeUntilDestroyed`).
- Formularze filtrów (`FormGroup`) emitują zmiany – po zmianie użytkownika wykonywany jest **nowy request do API**.
- Filtrowanie po treści i ulubionych odbywa się **po stronie frontendu**.

---

## 🎨 UI i UX

- Framework: **Angular Material**
- Użyte komponenty:
  - `MatFormField`
  - `MatInput`
  - `MatSelect`
  - `MatCheckbox`
  - `MatTooltip`
  - `MatProgressSpinner`
- Layout i stylizacja: **Tailwind CSS**
- Responsywność: `flex`, `sm:flex-row`, `gap`, `max-w-[1000px]`

---

## 🌀 Logika filtracji

| Filtr | Miejsce działania | Mechanizm |
|--------|--------------------|------------|
| **Treść posta** | Frontend | Filtracja lokalna po `title` i `body`. |
| **Użytkownik** | Backend | Request `GET /posts?userId=...`. |
| **Tylko ulubione** | Frontend | Filtracja po stanie w `PostsStore`. |

---

## 🔄 Flow działania

1. **UsersStore** ładuje użytkowników przy starcie.
2. **PostListComponent**:
  - Buduje `filtersForm`.
  - Subskrybuje zmiany formy (`toSignal`).
  - Wysyła request przez `PostsStore` po zmianie użytkownika.
3. **PostsStore**:
  - Pobiera dane z API.
  - Ustawia stan (`postsList`, `loading`).
4. **PostItemComponent**:
  - Wyświetla post.
  - Na kliknięcie serca — `toggleFavorite()`.
  - Na kliknięcie strzałki — rozwija komentarze (`getCommentsByPostId()`).

---

## 🧩 Dodatkowe elementy

- **Spinner ładowania** (Material Progress Spinner) przy `loading == true`.
- **Komunikat „Brak wyników”** gdy `filteredPosts().length === 0`.
- **Tooltips** przy przyciskach ulubionych i rozwijania komentarzy.

---

## ✅ Podsumowanie

Projekt wykorzystuje:
- **Angular 20**
- **Signals + RxJS**
- **Angular Material + Tailwind**
- **Modularną strukturę folderów (core / feature / shared)**

Zaprojektowany tak, aby był skalowalny, z czytelnym podziałem na warstwy:
- API (źródło danych)
- Store (zarządzanie stanem)
- UI (komponenty prezentacyjne)

