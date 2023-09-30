import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie'; // Импорт js-cookie
import './App.css';

function App() {
  const placeholders = {
    username: "Введіть ім'я",
    companyName: "Введіть назву вашої компанії",
    phoneNumber: "Введіть номер телефону",
    edrpou: "Введіть код ЄДРПОУ",
    email: "Введіть вашу пошту",
    additionalDescription: "Введіть додатковий опис", // Добавляем дополнительное поле
  };

  const [formData, setFormData] = useState({
    username: Cookies.get('username') || '',
    companyName: Cookies.get('companyName') || '',
    phoneNumber: Cookies.get('phoneNumber') || '',
    edrpou: Cookies.get('edrpou') || '',
    email: Cookies.get('email') || '',
    categories: {
      Добрива: Cookies.get('Добрива') === 'true' || false,
      Насіння: Cookies.get('Насіння') === 'true' || false,
      'Засоби захисту рослин': Cookies.get('Засоби захисту рослин') === 'true' || false,
      Електроенергія: Cookies.get('Електроенергія') === 'true' || false,
      Газ: Cookies.get('Газ') === 'true' || false,
      ПММ: Cookies.get('ПММ') === 'true' || false,
      'Канцелярські товари': Cookies.get('Канцелярські товари') === 'true' || false,
      'Господарські товари': Cookies.get('Господарські товари') === 'true' || false,
      'Будівельні матеріали': Cookies.get('Будівельні матеріали') === 'true' || false,
      Інше: Cookies.get('Інше') === 'true' || false,
    },
    additionalDescription: Cookies.get('additionalDescription') || '',
  });

  useEffect(() => {
    // Сохранение данных в куки при изменении формы
    Cookies.set('username', formData.username);
    Cookies.set('companyName', formData.companyName);
    Cookies.set('phoneNumber', formData.phoneNumber);
    Cookies.set('edrpou', formData.edrpou);
    Cookies.set('email', formData.email);
    // Object.keys(formData.categories).forEach((category) => {
    //   Cookies.set(category, formData.categories[category]);
    // });
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = { ...formData.categories };
    updatedCategories[category] = !updatedCategories[category];
    setFormData({
      ...formData,
      categories: updatedCategories,
    });
  };

  const handleClearCookies = () => {
    // Очистка всех кук
    Cookies.remove('username');
    Cookies.remove('companyName');
    Cookies.remove('phoneNumber');
    Cookies.remove('edrpou');
    Cookies.remove('email');
    Cookies.remove('additionalDescription');
    // Очищаем форму
    setFormData({
      username: '',
      companyName: '',
      phoneNumber: '',
      edrpou: '',
      email: '',
      categories: {
        Добрива: false,
        Насіння: false,
        'Засоби захисту рослин': false,
        Електроенергія: false,
        Газ: false,
        ПММ: false,
        'Канцелярські товари': false,
        'Господарські товари': false,
        'Будівельні матеріали': false,
        Інше: false,
      },
      additionalDescription: '',
    });
  };

  return (
    <div className="container mt-5">
      <form>
        {Object.keys(formData).map((field) => {
          // Проверка, что текущее поле не равно 'description'
          if (field !== 'additionalDescription') {
            return (
              <div className="mb-3" key={field}>
                {field === 'categories' ? (
                  <div>
                    {Object.keys(formData.categories).map((category) => (
                      <div className="form-check d-flex align-items-center" key={category}>
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          id={category}
                          name={category}
                          checked={formData.categories[category]}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <label className="form-check-label" htmlFor={category}>
                          {category}
                        </label>
                        <input
                          type="file"
                          className="form-control mt-2 ms-auto"
                          disabled={!formData.categories[category]}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    className="form-control"
                    id={field}
                    name={field}
                    placeholder={placeholders[field]}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                  />
                )}
              </div>
            );
          }
          return null; // Если поле 'description', то ничего не рендерим
        })}

         <textarea
          className="form-control"
          rows="3"
          id="additionalDescription"
          name="additionalDescription"
          // value={formData.additionalDescription}
          // onChange={handleInputChange}
          placeholder={placeholders.additionalDescription}
        />
        <button type="submit" className="btn btn-primary mt-2 me-2">
          Отправить
        </button>
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={handleClearCookies}
        >
          Очистити форму
        </button>
      </form>
    </div>
  );
}

export default App;
