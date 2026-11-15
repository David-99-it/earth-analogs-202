# NASA Locator

A web app that shows which places on Earth are most similar to targets on the Moon and Mars. Built for the NASA Space Apps Challenge.

**Live demo:** https://david99b.pythonanywhere.com

## Features

- **Locator.** Pick a comparison target and a task, and the app ranks Earth locations by similarity. Results are shown on a globe and on a map.
- **Targets:** Moon (Shackleton crater floor), Moon (pit in the Sea of Tranquility), Mars (Jezero crater), or a custom target.
- **Tasks** change the parameter weights: balanced, rover testing, ice and resources, search for life, shelters, heat and cold, dust and wind.
- **Tag filters** hide places without changing the ranking. There is also an "Understudied only" tag and a search by place name.
- **Compare** places side by side.
- **My site.** Check your own point on the map.
- **Methodology.** Explains how similarity is calculated.
- The interface is available in Russian and English (RU / EN).

## How similarity is calculated

The ranking is based on real NASA measurements in degrees, meters and millimeters. If data for a parameter is missing, it is not counted as zero and is simply left out of the calculation. Next to the similarity percentage the app shows data coverage (for example, "7 of 8").

## Repository structure

| Path | Purpose |
|------|---------|
| `config/` | Django project settings |
| `locator_app/` | Main application |
| `templates/` | HTML templates |
| `tools/` | Helper scripts |
| `data.json` | Location data |
| `manage.py` | Django entry point |

## Run locally

```bash
git clone https://github.com/David-99-it/earth-analogs-202.git
cd earth-analogs-202
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux / macOS
pip install django
python manage.py migrate
python manage.py runserver
```

Then open http://127.0.0.1:8000/ in your browser.

## Data sources

List the NASA and other datasets used in `data.json` here (for example, SRTM or ASTER GDEM for terrain, MODIS for surface temperature, GPM for precipitation).

## Team
Boskunchiev David, Manasova Asema, Lomakin Matvey, Mahar Hafiza, Arliev Muhammadamin
