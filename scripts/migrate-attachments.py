import os
import re
import shutil

repo_root = r"d:\dev\Public\lucasliachi"
certificados_dir = os.path.join(repo_root, "docs", "architecture", "certificados")
certificate_pages_dir = os.path.join(repo_root, "pages", "certificate")
academic_pages_dir = os.path.join(repo_root, "pages", "academic")

# Manual mapping dictionary
manual_overrides = {
    # Academic
    '2015-09-23_TECPUC_Tecnico_Qualidade.pdf': ('academic', '2014-01-TECPUC-Controle-Qualidade', 'certificate.pdf'),
    '2015-09-23_TECPUC_Tecnico_Qualidade_Declaracao.jpg': ('academic', '2014-01-TECPUC-Controle-Qualidade', 'supplement_declaracao.jpg'),
    '2015-09-23_TECPUC_Tecnico_Qualidade_v2.pdf': ('academic', '2014-01-TECPUC-Controle-Qualidade', 'supplement_v2.pdf'),
    
    '2021-02-09_UNIARA_MBA_CMMI_Qualidade_Software_Diploma.jpg': ('academic', '2018-01-UNIARA-MBA-CMMI', 'certificate.jpg'),
    '2021-02-09_UNIARA_MBA_CMMI_Qualidade_Software_Diploma_1.jpeg': ('academic', '2018-01-UNIARA-MBA-CMMI', 'supplement_diploma_1.jpeg'),
    '2021-02-09_UNIARA_MBA_CMMI_Qualidade_Software_Diploma_2.jpeg': ('academic', '2018-01-UNIARA-MBA-CMMI', 'supplement_diploma_2.jpeg'),
    '2021-02-09_UNIARA_MBA_CMMI_Qualidade_Software_Diploma_3.jpeg': ('academic', '2018-01-UNIARA-MBA-CMMI', 'supplement_diploma_3.jpeg'),
    '2021-02-09_UNIARA_MBA_CMMI_Qualidade_Software_Diploma_scan.jpg': ('academic', '2018-01-UNIARA-MBA-CMMI', 'supplement_diploma_scan.jpg'),
    '2021-02-09_UNIARA_MBA_CMMI_Qualidade_Software_Historico.pdf': ('academic', '2018-01-UNIARA-MBA-CMMI', 'supplement_historico.pdf'),
    '2021-02-09_UNIARA_MBA_CMMI_Qualidade_Software_v2.pdf': ('academic', '2018-01-UNIARA-MBA-CMMI', 'supplement_v2.pdf'),
    
    '2023-11-10_FIA_Pos_Eng_Arq_Software.pdf': ('academic', '2022-02-FIA-Business-School', 'certificate.pdf'),
    '2023-11-10_FIA_Pos_Eng_Arq_Software_Historico.pdf': ('academic', '2022-02-FIA-Business-School', 'supplement_historico.pdf'),

    # Certificates manual mappings to correct folders
    '2016-03-20_UNIBRA_Gestao_Projetos_2.pdf': ('certificate', '2016-06-Fundacao-Bradesco-Gestao-Projetos-Work', 'certificate.pdf'),
    '2016-07-24_UNIBRA_Gestao_Projetos_1.pdf': ('certificate', '2016-07-Fundacao-Bradesco-Gestao-Projetos-Start', 'certificate.pdf'),
    '2016-07-24_UNIBRA_BPM.pdf': ('certificate', '2016-03-Fundacao-Bradesco-Gestao-Processos', 'certificate.pdf'),
    
    '2016-12-26_ABPMP_BPM_Day.pdf': ('certificate', '2016-11-ABPMP-BPM-Day-2016', 'certificate.pdf'),
    '2017-11-03_ABPMP_BPM_Day_2017.pdf': ('certificate', '2017-10-ABPMP-BPM-Day-2017', 'certificate.pdf'),
    
    '2020-05-24_MINTIC_Mineracao_Processos.pdf': ('certificate', '2020-05-ABPMP-Process-Mining', 'certificate.pdf'),
    '2020-05-29_MINTIC_Mineracao_Processos_Pratica.pdf': ('certificate', '2020-05-ABPMP-Process-Mining', 'supplement_pratica.pdf'),
    '2020-05-29_PANORAMA_Transformacao_Processos.pdf': ('certificate', '2020-05-ABPMP-Global-Transformation', 'certificate.pdf'),
    
    '2020-07-08_CERTIPROF_SCRUM_Master.pdf': ('certificate', '2021-10-Scrum-Product-Owner', 'supplement_scrum_master.pdf'),
    '2020-07-12_CERTIPROF_SFPC_Scrum_Foundation.pdf': ('certificate', '2021-10-Scrum-Product-Owner', 'supplement_scrum_foundation.pdf'),
    
    '2020-09-08_KANBAN_Certificado.pdf': ('certificate', '2021-08-KMP-I-Kanban-System-Design', 'certificate.pdf'),
    '2021-09-25_MANAGEMENT30_Certificado.pdf': ('certificate', '2021-09-Management3-Fundamentals', 'certificate.pdf'),
    '2021-10-17_AGILE_ACADEMY_CSPO_Treinamento.pdf': ('certificate', '2021-10-Scrum-Product-Owner', 'supplement_cspo_treinamento.pdf'),
    
    # Unmatched / Ignore
    '2018-04-04_QANINJA_QA_Experience.pdf': (None, None, None),
    '2015-00-00_PINHO_Auditor_Lider.pdf': (None, None, None),
    '2016-00-00_PINHO_Auditor_Lider.pdf': (None, None, None),
    '2025-03-05_ISACA_Membership.pdf': (None, None, None),
    'Concurso Literário 2007.pdf': (None, None, None),
    '2018-03-29_EAD_SUMMIT_Participacao.pdf': (None, None, None),
    '2020-07-06_PMG_ACADEMY_Scrum.pdf': ('certificate', '2021-10-Scrum-Product-Owner', 'supplement_pmg_scrum.pdf'),
}

months = {
    'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6, 'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12,
    'janeiro': 1, 'fevereiro': 2, 'março': 3, 'marco': 3, 'abril': 4, 'maio': 5, 'junho': 6, 'julho': 7, 'agosto': 8, 'setembro': 9, 'outubro': 10, 'novembro': 11, 'dezembro': 12,
    'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
}

def parse_date(date_str):
    if not date_str:
        return None
    cleaned = re.sub(r'\b(de|del)\b', '', date_str, flags=re.IGNORECASE)
    parts = re.findall(r'[a-zA-ZÀ-ÿ]+|\d+', cleaned)
    year, month = None, None
    for p in parts:
        if p.isdigit():
            val = int(p)
            if val > 1900:
                year = val
            elif 1 <= val <= 12:
                month = val
        else:
            m_str = p.lower()[:3]
            if m_str in months:
                month = months[m_str]
    return (year, month) if year and month else None

def parse_md_file(filepath):
    metadata = {}
    title = ""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            t_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
            if t_match:
                title = t_match.group(1).strip()
            lines = content.split('\n')
            for line in lines:
                m = re.match(r'^[-*]\s+([^:]+):\s+(.+)$', line)
                if m:
                    key = m.group(1).strip().lower()
                    key = re.sub(r'[^a-z0-9]', '', key)
                    metadata[key] = m.group(2).strip()
    except Exception:
        pass
    return title, metadata

def load_destinations():
    dests = []
    # Load certificates
    if os.path.exists(certificate_pages_dir):
        for fld in os.listdir(certificate_pages_dir):
            fld_path = os.path.join(certificate_pages_dir, fld)
            if os.path.isdir(fld_path):
                title, meta = "", {}
                for lang in ['EN', 'PT', 'ES']:
                    candidate = os.path.join(fld_path, f"{lang}.md")
                    if os.path.exists(candidate):
                        title, meta = parse_md_file(candidate)
                        break
                issuer = meta.get('issuer') or meta.get('emissor') or ''
                cred_id = meta.get('credentialid') or meta.get('codigodacredencial') or meta.get('iddacredencial') or ''
                date_parsed = parse_date(meta.get('issued') or meta.get('emitido') or '')
                
                dests.append({
                    'type': 'certificate',
                    'folder': fld,
                    'title': title,
                    'org': issuer,
                    'date': date_parsed,
                    'cred_id': cred_id
                })
    # Load academics
    if os.path.exists(academic_pages_dir):
        for fld in os.listdir(academic_pages_dir):
            fld_path = os.path.join(academic_pages_dir, fld)
            if os.path.isdir(fld_path):
                title, meta = "", {}
                for lang in ['EN', 'PT', 'ES']:
                    candidate = os.path.join(fld_path, f"{lang}.md")
                    if os.path.exists(candidate):
                        title, meta = parse_md_file(candidate)
                        break
                inst = meta.get('institution') or meta.get('instituicao') or meta.get('institucion') or ''
                
                dests.append({
                    'type': 'academic',
                    'folder': fld,
                    'title': title,
                    'org': inst,
                    'date': None,
                    'cred_id': ''
                })
    return dests

def get_words(name):
    name_clean = re.sub(r'[^a-zA-Z0-9\s]', ' ', name.lower())
    words = set(name_clean.split())
    stop_words = {'de', 'da', 'do', 'para', 'em', 'and', 'in', 'the', 'a', 'o', 'y', 'of', 'for', 'co', 'group'}
    return {w for w in words if w not in stop_words and not w.isdigit()}

def match_file_to_dest(file, dests):
    # Check overrides
    if file in manual_overrides:
        d_type, d_fld, d_name = manual_overrides[file]
        if d_type is None:
            return None, None
        # Find dest object
        for d in dests:
            if d['type'] == d_type and d['folder'] == d_fld:
                return d, d_name
                
    file_date_match = re.match(r'^(\d{4}-\d{2})', file)
    file_date_str = file_date_match.group(1) if file_date_match else None
    file_name_no_ext = os.path.splitext(file)[0]
    file_words = get_words(file_name_no_ext)
    
    best_dest = None
    best_score = -1
    
    for d in dests:
        score = 0
        
        # Match by Credential ID
        if d['cred_id'] and d['cred_id'].lower() in file.lower():
            score += 15
            
        # Match by Date
        if file_date_str:
            folder_date_match = re.match(r'^(\d{4}-\d{2})', d['folder'])
            folder_date_str = folder_date_match.group(1) if folder_date_match else None
            if folder_date_str == file_date_str:
                score += 5
            elif d['date']:
                f_yr, f_mo = map(int, file_date_str.split('-'))
                d_yr, d_mo = d['date']
                if f_yr == d_yr and f_mo == d_mo:
                    score += 3
                    
        # Match by Org / Issuer
        org_words = get_words(d['org'])
        common_org = org_words.intersection(file_words)
        if common_org:
            score += len(common_org) * 3
            
        # Match by Title / Folder Words
        folder_words = get_words(d['folder'])
        common_folder = folder_words.intersection(file_words)
        if common_folder:
            score += len(common_folder) * 2
            
        if score > best_score:
            best_score = score
            best_dest = d
            
    # We require a threshold score of 5 to match automatically
    if best_score >= 5:
        # Determine standard name
        ext = os.path.splitext(file)[1].lower()
        # If it contains supplemental indicators, name it supplement_<clean_name>
        is_supplement = any(x in file.lower() for x in ['score', 'relatorio', 'historico', 'declaracao', 'scan', 'contrato', 'comprovante'])
        if is_supplement:
            clean_name = re.sub(r'^\d{4}-\d{2}-\d{2}_', '', file_name_no_ext)
            clean_name = re.sub(r'[^a-zA-Z0-9]', '_', clean_name).lower()
            return best_dest, f"supplement_{clean_name}{ext}"
        else:
            return best_dest, f"certificate{ext}"
            
    return None, None

def update_markdown_files(folder_path, rel_attachment_path):
    # Search all .md files in the directory
    for f in os.listdir(folder_path):
        if f.endswith('.md'):
            filepath = os.path.join(folder_path, f)
            try:
                with open(filepath, 'r', encoding='utf-8') as file_obj:
                    content = file_obj.read()
                
                # Check if it already has attachment / anexo key
                has_attachment = re.search(r'^[-*]\s+(Attachment|Anexo):\s+', content, re.MULTILINE | re.IGNORECASE)
                if has_attachment:
                    # Replace existing
                    content = re.sub(r'^[-*]\s+(Attachment|Anexo):\s+.*$', f"- Attachment: {rel_attachment_path}", content, flags=re.MULTILINE | re.IGNORECASE)
                else:
                    # Insert right after the title `# ` line, or after the first lines
                    lines = content.split('\n')
                    inserted = False
                    for idx, line in enumerate(lines):
                        if line.startswith('#'):
                            # Insert at idx + 2 (below the title and blank line)
                            key_label = "Anexo" if f.startswith('PT') or f.startswith('ES') else "Attachment"
                            lines.insert(idx + 2, f"- {key_label}: {rel_attachment_path}")
                            inserted = True
                            break
                    if not inserted:
                        lines.insert(0, f"- Attachment: {rel_attachment_path}")
                    content = '\n'.join(lines)
                
                with open(filepath, 'w', encoding='utf-8') as file_obj:
                    file_obj.write(content)
                print(f"  -> Updated markdown: {os.path.basename(filepath)} with attachment path: {rel_attachment_path}")
            except Exception as e:
                print(f"  -> Error updating markdown {f}: {e}")

def main():
    dests = load_destinations()
    files = [f for f in os.listdir(certificados_dir) if os.path.isfile(os.path.join(certificados_dir, f))]
    
    matched_count = 0
    unmatched_count = 0
    
    # Store mapped files per folder to identify the "main" certificate
    folder_mappings = {}
    
    for file in files:
        dest, std_name = match_file_to_dest(file, dests)
        if dest:
            key = (dest['type'], dest['folder'])
            if key not in folder_mappings:
                folder_mappings[key] = []
            folder_mappings[key].append((file, std_name))
        else:
            print(f"Unmatched: {file}")
            unmatched_count += 1
            
    # Process files per folder
    for (d_type, d_folder), file_list in folder_mappings.items():
        # Folder full path
        dest_base_dir = certificate_pages_dir if d_type == 'certificate' else academic_pages_dir
        dest_folder_path = os.path.join(dest_base_dir, d_folder)
        os.makedirs(dest_folder_path, exist_ok=True)
        
        # Determine main certificate (the one without 'supplement' prefix)
        # If there are multiple, or if all are named supplement, make the first one the certificate
        has_main = any(not std.startswith('supplement_') for orig, std in file_list)
        if not has_main and file_list:
            # force first file to be standard certificate
            orig, std = file_list[0]
            ext = os.path.splitext(orig)[1].lower()
            file_list[0] = (orig, f"certificate{ext}")
            
        main_rel_path = None
        
        for orig_file, std_name in file_list:
            src_path = os.path.join(certificados_dir, orig_file)
            dest_path = os.path.join(dest_folder_path, std_name)
            
            # Copy file
            shutil.copy2(src_path, dest_path)
            print(f"Moved: {orig_file} -> {d_type}/{d_folder}/{std_name}")
            if os.path.exists(src_path):
                os.remove(src_path)
            matched_count += 1
            
            # Save relative path of main certificate for markdown
            if std_name.startswith('certificate.'):
                main_rel_path = f"pages/{d_type}/{d_folder}/{std_name}"
                
        # If we have a main certificate path, update markdown files in this folder
        if main_rel_path:
            update_markdown_files(dest_folder_path, main_rel_path)
            
    print(f"\nMigration Summary:")
    print(f"Total files processed: {len(files)}")
    print(f"Matched and copied: {matched_count}")
    print(f"Unmatched (left in source): {unmatched_count}")

if __name__ == "__main__":
    main()
