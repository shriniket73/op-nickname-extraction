import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const themes = {
  classic: {
    name: 'Classic Black on White',
    colors: {
      background: 'bg-white',
      text: 'text-black',
      accent: 'bg-black',
      button: 'hover:bg-gray-100',
      secondary: 'text-gray-600'
    }
  },
  soft: {
    name: 'Soft Gray on White',
    colors: {
      background: 'bg-white',
      text: 'text-gray-800',
      accent: 'bg-gray-900',
      button: 'hover:bg-gray-50',
      secondary: 'text-gray-500'
    }
  },
  inverted: {
    name: 'White on Black',
    colors: {
      background: 'bg-black',
      text: 'text-white',
      accent: 'bg-white',
      button: 'hover:bg-gray-900',
      secondary: 'text-gray-300'
    }
  },
  grayScale: {
    name: 'Dark Gray on Light',
    colors: {
      background: 'bg-gray-50',
      text: 'text-gray-900',
      accent: 'bg-gray-800',
      button: 'hover:bg-gray-100',
      secondary: 'text-gray-600'
    }
  },
  contrast: {
    name: 'High Contrast Light',
    colors: {
      background: 'bg-[#FAFAFA]',
      text: 'text-[#111111]',
      accent: 'bg-black',
      button: 'hover:bg-gray-50',
      secondary: 'text-gray-700'
    }
  },
  paper: {
    name: 'Paper Theme',
    colors: {
      background: 'bg-[#F5F5F5]',
      text: 'text-[#1A1A1A]',
      accent: 'bg-[#2D2D2D]',
      button: 'hover:bg-white',
      secondary: 'text-[#4A4A4A]'
    }
  },
  clean: {
    name: 'Clean Minimal',
    colors: {
      background: 'bg-white',
      text: 'text-[#2B2B2B]',
      accent: 'bg-[#3D3D3D]',
      button: 'hover:bg-gray-50',
      secondary: 'text-[#666666]'
    }
  },
  crisp: {
    name: 'Crisp Contrast',
    colors: {
      background: 'bg-[#FFFFFF]',
      text: 'text-[#000000]',
      accent: 'bg-[#333333]',
      button: 'hover:bg-[#F8F8F8]',
      secondary: 'text-[#555555]'
    }
  }
};

const BWThemePlayground = () => {
  return (
    <div className="space-y-12 p-8">
      {Object.entries(themes).map(([key, theme]) => (
        <div key={key} className={`${theme.colors.background} p-8 rounded-xl shadow-lg`}>
          <h2 className={`font-chomiku text-3xl ${theme.colors.text} mb-8`}>
            {theme.name}
          </h2>

          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress value={65} className={`h-1.5 ${theme.colors.accent}`} />
            </div>

            {/* Sample Question */}
            <div className="space-y-6">
              <h3 className={`font-chomiku text-2xl ${theme.colors.text}`}>
                What was Vishal Dayama&apos;s OP name?
              </h3>

              <div className="space-y-3">
                {['Husband OP', 'Shauhar OP', 'Aktually'].map((option, index) => (
                  <Button
                    key={option}
                    variant="ghost"
                    className={`w-full justify-start font-chomiku text-lg ${
                      index === 1 
                        ? `${theme.colors.text} bg-gray-100` 
                        : `${theme.colors.text} ${theme.colors.button}`
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Description Text */}
            <p className={`${theme.colors.secondary} font-chomiku text-base`}>
              Aktually he was introduced as Advertiser OP and then he got married and it got changed to Shauhar OP
            </p>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="ghost"
                className={`font-chomiku text-lg ${theme.colors.text} ${theme.colors.button}`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                variant="ghost"
                className={`font-chomiku text-lg ${theme.colors.text} ${theme.colors.button}`}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Color Codes */}
            <div className={`text-sm ${theme.colors.secondary} space-y-1 pt-4 border-t border-opacity-20`}>
              <p>Background: {theme.colors.background.split('-').pop()}</p>
              <p>Text: {theme.colors.text.split('-').pop()}</p>
              <p>Accent: {theme.colors.accent.split('-').pop()}</p>
              <p>Secondary: {theme.colors.secondary.split('-').pop()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BWThemePlayground;