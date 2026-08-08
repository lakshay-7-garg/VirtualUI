# Virtual UI

A modern and customizable **React UI Component Library** designed for fast development and clean design systems.

---

## 📦 Install

```bash
npm i virtual-ui-componenet-library
```

---

## 🚀 Usage

```jsx
import {
  Navbar,
  Sidebar,
  AvatarCard,
  PricingCard,
  Loader,
  OTPInput,
} from "virtual-ui-componenet-library";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div style={{ padding: "20px" }}>
        <AvatarCard />
        <PricingCard />
        <OTPInput />
        <Loader />
      </div>
    </>
  );
}
```

---

# 🧩 Components

Virtual UI includes the following components:

- AvatarCard
- BackgroundImageSlider
- Charts
- ColorPicker
- FileUpload
- Footer
- ImageCard
- ImageSlider
- InvoiceCard
- Loader
- Navbar
- NotificationToast
- OTPInput
- PageLoader
- PricingCard
- RatingStars
- Sidebar

---

# 📘 Component Details

---

## AvatarCard

```jsx
<AvatarCard />
```

### Props

| Prop  | Description  |
| ----- | ------------ |
| name  | User name    |
| image | Avatar image |
| role  | User role    |
| size  | Card size    |

---

## Navbar

```jsx
<Navbar />
```

### Props

| Prop  | Description      |
| ----- | ---------------- |
| logo  | Logo text/image  |
| links | Navigation links |
| fixed | Sticky navbar    |

---

## Sidebar

```jsx
<Sidebar />
```

### Props

| Prop      | Description    |
| --------- | -------------- |
| items     | Sidebar items  |
| collapsed | Collapse state |

---

## PricingCard

```jsx
<PricingCard />
```

### Props

| Prop        | Description      |
| ----------- | ---------------- |
| title       | Plan name        |
| price       | Plan price       |
| features    | List of features |
| highlighted | Highlight plan   |

---

## OTPInput

```jsx
<OTPInput length={6} />
```

### Props

| Prop     | Description        |
| -------- | ------------------ |
| length   | Number of digits   |
| onChange | OTP change handler |

---

## Loader

```jsx
<Loader />
```

### Props

| Prop  | Description  |
| ----- | ------------ |
| size  | Loader size  |
| color | Loader color |

---

## NotificationToast

```jsx
<NotificationToast message="Saved!" />
```

### Props

| Prop    | Description            |
| ------- | ---------------------- |
| message | Toast text             |
| type    | success / error / info |

---

## Charts

```jsx
<Charts />
```

### Props

| Prop | Description      |
| ---- | ---------------- |
| type | bar / line / pie |
| data | Chart data       |

---

## ColorPicker

```jsx
<ColorPicker />
```

### Props

| Prop     | Description    |
| -------- | -------------- |
| value    | Selected color |
| onChange | Change handler |

---

## FileUpload

```jsx
<FileUpload />
```

### Props

| Prop     | Description          |
| -------- | -------------------- |
| onUpload | Upload handler       |
| multiple | Allow multiple files |

---

## ImageCard

```jsx
<ImageCard />
```

### Props

| Prop  | Description  |
| ----- | ------------ |
| src   | Image source |
| title | Image title  |

---

## ImageSlider

```jsx
<ImageSlider />
```

### Props

| Prop     | Description |
| -------- | ----------- |
| images   | Image array |
| autoPlay | Auto slide  |

---

## BackgroundImageSlider

```jsx
<BackgroundImageSlider />
```

### Props

| Prop    | Description       |
| ------- | ----------------- |
| images  | Background images |
| overlay | Overlay color     |

---

## InvoiceCard

```jsx
<InvoiceCard />
```

### Props

| Prop      | Description    |
| --------- | -------------- |
| invoiceId | Invoice ID     |
| amount    | Amount         |
| status    | Paid / Pending |

---

## RatingStars

```jsx
<RatingStars rating={4} />
```

### Props

| Prop     | Description     |
| -------- | --------------- |
| rating   | Number of stars |
| onChange | Change handler  |

---

## PageLoader

```jsx
<PageLoader />
```

### Props

| Prop       | Description      |
| ---------- | ---------------- |
| fullScreen | Full page loader |

---

## Footer

```jsx
<Footer />
```

### Props

| Prop  | Description  |
| ----- | ------------ |
| text  | Footer text  |
| links | Footer links |

---

# 🤝 Contributing

Contributions are welcome!

- Fork the repo
- Create a new branch
- Submit a pull request

---

# 📄 License

MIT License

---

# 💡 Future Improvements

- Theme system (dark/light mode)
- Animation presets
- Accessibility improvements
- More enterprise components

---

Made with ❤️ for developers
