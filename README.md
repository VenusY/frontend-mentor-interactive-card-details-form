# frontend-mentor-interactive-card-details-form

## The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

## Built with

- Semantic HTML5 markup
- SCSS
- CSS custom properties
- Flexbox
- Mobile-first workflow

## What I learned

**Bringing up the numerical keyboard on mobile using the `pattern` and `inputmode` attributes**

You can apply `pattern="[0-9]*"` and `inputmode="numeric"` on input fields to bring up the numerical keyboard for mobile users even if the `type` attribute is set to `"text"`. The reason for doing it this way is to prevent the spinner from appearing.

```html
<input
  type="text"
  pattern="[0-9]*"
  maxlength="19"
  autocomplete="cc-number"
  placeholder="e.g. 1234 5678 9123 0000"
  class="form__input-field form__number"
  id="form__number"
/>
```

**Gradient border**

Using linear gradients for borders aren't possible at the time of making of this project.

To get around this, I used a wrapper element on the input fields, then removed the borders from them, while adding a `padding` of `1px` to the wrapper to achieve the appearance of a border with `1px` thickness.

To achieve the coloured border look, a `background` was set. For the default colour, a gray-ish colour was given to the `background` property.

For the active input border, `:focus-within` was used on the wrapper element to set the `background` property to the gradient.

```html
<div class="form__input-field-border">
  <input
    type="text"
    pattern="\d*"
    autocomplete="cc-exp-month"
    placeholder="MM"
    class="form__input-field form__exp-month"
    id="form__exp-month"
  />
</div>
```
```css
.form__input-field-border {
  width: 100%;
  height: 2.8125rem;
  padding: 1px;
  border-radius: 6px;
  background: var(--light-grayish-violet);
}

.form__input-field-border:focus-within {
  background: linear-gradient(to right, hsl(249deg, 99%, 64%), hsl(278deg, 94%, 30%));
}
```

**`:focus-within` pseudo-class**

`:focus-within` is applied when the user focuses on either the element itself or one of its children.

**SCSS loud comments**

If you want comments to show up in the compiled CSS, write comments enclosed in `/* */`.

**Setting a character limit using the `maxlength` attribute**

The `maxlength` attribute can be used on the `<input>` and `<textarea>` tags to set a limit on the number of characters the user can enter. The value of this attribute must be 0 or greater.

For the card number, `maxlength="19"` was added to the input field to account for the spaces between the card number's 4-character segments (e.g. 0000 0000 0000 0000).

For the exp month and year, the `maxlength` was set to 2.

For the cvc, the `maxlength` was set to 3.

```html
<input
  type="text"
  pattern="\d*"
  maxlength="19"
  autocomplete="cc-number"
  placeholder="e.g. 1234 5678 9123 0000"
  class="form__input-field form__number"
  id="form__number"
/>
```

## Useful resources

- [Gradient borders](https://css-tricks.com/gradient-borders-in-css/) - Explains how to use wrapper elements to achieve gradient borders + other methods.
