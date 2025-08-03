interface Language {
  name: string
  level: 'Native/Bilingual' | 'Fluent' | 'Conversational'
}

export function LanguagesList({ languages }: { languages: Language[] }) {
  return (
    <div className="backdrop-blur-md p-6 border-t border-white/10">
      <h2 className="text-xl font-semibold mb-4">Languages</h2>
      <div className="space-y-3">
        {languages.map((lang, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-300">{lang.name}</span>
            <span className="text-sm text-gray-400 px-3 py-1 bg-white/5 rounded-full">
              {lang.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}