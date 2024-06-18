import re
from datetime import datetime, timedelta
from collections import defaultdict, OrderedDict
from prettytable import PrettyTable

# Funzione per parsare il log di Git
def parse_log(log_content):
    pattern = re.compile(r'([a-f0-9]+) - (.+), (\d{4}-\d{2}-\d{2}) : (.+)')
    commits = []
    for line in log_content.split('\n'):
        match = pattern.match(line)
        if match:
            hash, author, date, message = match.groups()
            commits.append({
                'hash': hash,
                'author': author,
                'date': datetime.strptime(date, '%Y-%m-%d').date(),
                'message': message
            })
    return commits

# Funzione per sostituire i nomi degli autori
def replace_author_names(author):
    replacements = {
        "ShyVortex": "Angelo Trotta",
        "lorenzo.lepore": "Lorenzo Lepore",
        "mariolino21714@gmail.com": "Mario Rascato",
        "TheBiggestONE00": "Mario Rascato",
        "mariorascato": "Mario Rascato",
        "Darpet23": "Dario Petruccelli",
        "SimonGitto": "Simone Infantino"
    }
    return replacements.get(author, author)

# Funzione per calcolare il prossimo mercoledì
def next_wednesday(d):
    days_ahead = 2 - d.weekday()
    if days_ahead < 0:
        days_ahead += 7
    return d + timedelta(days=days_ahead)

# Crea intervalli di date ogni due mercoledì
start_date = datetime(2024, 4, 9).date()
end_date = datetime(2024, 6, 17).date()
date_ranges = []
current_start = start_date

while current_start <= end_date:
    current_end = next_wednesday(current_start) + timedelta(days=13)
    date_ranges.append((current_start, current_end))
    current_start = current_end + timedelta(days=1)

# Leggi il file di log
with open('git-log-backend.txt', 'r') as f:
    log_content = f.read()

commits = parse_log(log_content)

# Organizza i commit per intervallo di date
organized_commits = OrderedDict()
for start, end in date_ranges:
    organized_commits[(start, end)] = []

for commit in commits:
    commit['author'] = replace_author_names(commit['author'])
    for start, end in date_ranges:
        if start <= commit['date'] <= end:
            organized_commits[(start, end)].append(commit)
            break

# Crea la tabella
table = PrettyTable()
table.field_names = ["Data", "Autore", "Messaggio"]

for (start, end), commits in organized_commits.items():
    for commit in commits:
        table.add_row([f'{start} - {end}', commit['author'], commit['message']])

# Stampa la tabella
print(table)

