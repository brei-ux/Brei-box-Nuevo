#!/usr/bin/env python3
"""
Script para extraer todo el código de un workspace de VSCode
y compilarlo en un solo archivo con indicadores de origen.
"""

import os
import json
from pathlib import Path
from typing import List, Set

# Extensiones de archivos de código comunes
CODE_EXTENSIONS = {
    '.py', '.js', '.ts', '.tsx', '.jsx', '.java', '.c', '.cpp', '.h', '.hpp',
    '.cs', '.rb', '.go', '.rs', '.php', '.swift', '.kt', '.scala', '.r',
    '.m', '.mm', '.dart', '.vue', '.svelte', '.astro', '.html', '.css', '.scss', '.sass',
    '.less', '.sql', '.sh', '.bash', '.zsh', '.ps1', '.bat', '.cmd', '.json',
    '.xml', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf', '.md', '.rst',
    '.tex', '.lua', '.perl', '.pl', '.asm', '.s', '.vhdl', '.v', '.sv', '.prisma'
}

# Carpetas a ignorar
IGNORE_FOLDERS = {
    'node_modules', '.git', '__pycache__', '.vscode', '.idea', 'dist', 'build',
    'out', 'bin', 'obj', 'target', '.next', '.nuxt', 'venv', 'env', '.env',
    'coverage', '.pytest_cache', '.mypy_cache', 'vendor', 'packages'
}

# Archivos específicos a ignorar
IGNORE_FILES = {
    'pnpm-lock.yaml', 'package-lock.json', 'yarn.lock'
}

def find_workspace_folders(workspace_file: str = None) -> List[Path]:
    """
    Encuentra las carpetas del workspace desde el archivo .code-workspace
    o usa el directorio actual si no se especifica.
    """
    if workspace_file and os.path.exists(workspace_file):
        with open(workspace_file, 'r', encoding='utf-8') as f:
            workspace_data = json.load(f)
            folders = []
            for folder in workspace_data.get('folders', []):
                folder_path = Path(folder['path'])
                # Si la ruta es relativa, hacerla absoluta respecto al workspace
                if not folder_path.is_absolute():
                    workspace_dir = Path(workspace_file).parent
                    folder_path = (workspace_dir / folder_path).resolve()
                folders.append(folder_path)
            return folders
    else:
        # Si no hay archivo workspace, usar el directorio actual
        return [Path.cwd()]

def should_ignore_folder(folder_name: str) -> bool:
    """Verifica si una carpeta debe ser ignorada."""
    return folder_name in IGNORE_FOLDERS or folder_name.startswith('.')

def is_code_file(file_path: Path) -> bool:
    """Verifica si un archivo es un archivo de código y no debe ser ignorado."""
    return (file_path.suffix.lower() in CODE_EXTENSIONS and 
            file_path.name not in IGNORE_FILES)

def collect_code_files(root_folders: List[Path]) -> List[Path]:
    """Recopila todos los archivos de código de las carpetas raíz."""
    code_files = []
    
    for root_folder in root_folders:
        if not root_folder.exists():
            print(f"⚠️  Advertencia: La carpeta {root_folder} no existe")
            continue
            
        for dirpath, dirnames, filenames in os.walk(root_folder):
            # Filtrar carpetas a ignorar
            dirnames[:] = [d for d in dirnames if not should_ignore_folder(d)]
            
            for filename in filenames:
                file_path = Path(dirpath) / filename
                if is_code_file(file_path):
                    code_files.append(file_path)
    
    return sorted(code_files)

def extract_code_to_file(code_files: List[Path], output_file: str, root_folders: List[Path]):
    """Extrae el código de todos los archivos y lo escribe en un archivo de salida."""
    
    with open(output_file, 'w', encoding='utf-8') as out:
        out.write("=" * 80 + "\n")
        out.write("CÓDIGO EXTRAÍDO DEL WORKSPACE\n")
        out.write(f"Total de archivos: {len(code_files)}\n")
        out.write(f"Carpetas raíz: {', '.join(str(f) for f in root_folders)}\n")
        out.write("=" * 80 + "\n\n")
        
        for i, file_path in enumerate(code_files, 1):
            # Encontrar la carpeta raíz correspondiente
            relative_path = None
            for root in root_folders:
                try:
                    relative_path = file_path.relative_to(root)
                    break
                except ValueError:
                    continue
            
            if relative_path is None:
                relative_path = file_path
            
            # Escribir encabezado del archivo
            out.write("\n" + "=" * 80 + "\n")
            out.write(f"ARCHIVO {i}/{len(code_files)}: {relative_path}\n")
            out.write(f"Ruta completa: {file_path}\n")
            out.write("=" * 80 + "\n\n")
            
            # Leer y escribir el contenido del archivo
            try:
                with open(file_path, 'r', encoding='utf-8') as code_file:
                    content = code_file.read()
                    out.write(content)
                    if not content.endswith('\n'):
                        out.write('\n')
            except UnicodeDecodeError:
                out.write("[ERROR: No se pudo decodificar el archivo - posiblemente es binario]\n")
            except Exception as e:
                out.write(f"[ERROR al leer archivo: {str(e)}]\n")
            
            out.write("\n")

def main():
    print("🔍 Extractor de Código del Workspace\n")
    
    # Buscar archivo .code-workspace en el directorio actual
    workspace_files = list(Path.cwd().glob("*.code-workspace"))
    
    if workspace_files:
        workspace_file = workspace_files[0]
        print(f"📁 Encontrado workspace: {workspace_file.name}")
        root_folders = find_workspace_folders(str(workspace_file))
    else:
        print("ℹ️  No se encontró archivo .code-workspace, usando directorio actual")
        root_folders = find_workspace_folders()
    
    print(f"\n📂 Carpetas a procesar:")
    for folder in root_folders:
        print(f"   • {folder}")
    
    # Recopilar archivos
    print("\n🔎 Buscando archivos de código...")
    code_files = collect_code_files(root_folders)
    
    if not code_files:
        print("❌ No se encontraron archivos de código")
        return
    
    print(f"✅ Encontrados {len(code_files)} archivos de código")
    
    # Generar archivo de salida
    output_file = "workspace_code_extraction.txt"
    print(f"\n📝 Generando archivo: {output_file}")
    
    extract_code_to_file(code_files, output_file, root_folders)
    
    print(f"✅ ¡Completado! Código extraído en: {output_file}")
    print(f"📊 Total de archivos procesados: {len(code_files)}")

if __name__ == "__main__":
    main()