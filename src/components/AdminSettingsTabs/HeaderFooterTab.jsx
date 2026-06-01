import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Plus, Trash2, Upload, Link, X, Image as ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';

const HeaderFooterTab = ({ settings, setSettings, handleLogoUpload }) => {
  const addNavLink = () => {
    const currentLinks = settings.header_config?.nav_links || [];
    setSettings({
      ...settings,
      header_config: {
        ...settings.header_config,
        nav_links: [...currentLinks, { label: 'New Link', url: '/' }]
      }
    });
  };

  const updateNavLink = (index, field, value) => {
    const newLinks = [...(settings.header_config?.nav_links || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setSettings({
      ...settings,
      header_config: { ...settings.header_config, nav_links: newLinks }
    });
  };

  const removeNavLink = (index) => {
    const newLinks = (settings.header_config?.nav_links || []).filter((_, i) => i !== index);
    setSettings({
      ...settings,
      header_config: { ...settings.header_config, nav_links: newLinks }
    });
  };

  const moveNavLink = (index, direction) => {
    const newLinks = [...(settings.header_config?.nav_links || [])];
    if (direction === 'up' && index > 0) {
      [newLinks[index], newLinks[index - 1]] = [newLinks[index - 1], newLinks[index]];
    } else if (direction === 'down' && index < newLinks.length - 1) {
      [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
    }
    setSettings({
      ...settings,
      header_config: { ...settings.header_config, nav_links: newLinks }
    });
  };

  const addFooterColumn = () => {
    const currentCols = settings.footer_config?.columns || [];
    setSettings({
      ...settings,
      footer_config: {
        ...settings.footer_config,
        columns: [...currentCols, { title: 'New Column', links: [] }]
      }
    });
  };

  const addFooterLink = (colIdx) => {
    const newCols = [...(settings.footer_config?.columns || [])];
    if (!newCols[colIdx].links) newCols[colIdx].links = [];
    newCols[colIdx].links = [...newCols[colIdx].links, { label: 'New Link', url: '/' }];
    setSettings({
      ...settings,
      footer_config: { ...settings.footer_config, columns: newCols }
    });
  };

  const updateFooterLink = (colIdx, linkIdx, field, value) => {
    const newCols = [...(settings.footer_config?.columns || [])];
    newCols[colIdx].links[linkIdx] = { ...newCols[colIdx].links[linkIdx], [field]: value };
    setSettings({
      ...settings,
      footer_config: { ...settings.footer_config, columns: newCols }
    });
  };

  const removeFooterColumn = (idx) => {
    const newCols = (settings.footer_config?.columns || []).filter((_, i) => i !== idx);
    setSettings({
      ...settings,
      footer_config: { ...settings.footer_config, columns: newCols }
    });
  };

  const removeFooterLink = (colIdx, linkIdx) => {
    const newCols = [...(settings.footer_config?.columns || [])];
    newCols[colIdx].links = newCols[colIdx].links.filter((_, i) => i !== linkIdx);
    setSettings({
      ...settings,
      footer_config: { ...settings.footer_config, columns: newCols }
    });
  };

  const moveFooterColumn = (index, direction) => {
    const newCols = [...(settings.footer_config?.columns || [])];
    if (direction === 'up' && index > 0) {
      [newCols[index], newCols[index - 1]] = [newCols[index - 1], newCols[index]];
    } else if (direction === 'down' && index < newCols.length - 1) {
      [newCols[index], newCols[index + 1]] = [newCols[index + 1], newCols[index]];
    }
    setSettings({
      ...settings,
      footer_config: { ...settings.footer_config, columns: newCols }
    });
  };

  const moveFooterLink = (colIdx, linkIdx, direction) => {
    const newCols = [...(settings.footer_config?.columns || [])];
    if (direction === 'up' && linkIdx > 0) {
      [newCols[colIdx].links[linkIdx], newCols[colIdx].links[linkIdx - 1]] = [newCols[colIdx].links[linkIdx - 1], newCols[colIdx].links[linkIdx]];
    } else if (direction === 'down' && linkIdx < newCols[colIdx].links.length - 1) {
      [newCols[colIdx].links[linkIdx], newCols[colIdx].links[linkIdx + 1]] = [newCols[colIdx].links[linkIdx + 1], newCols[colIdx].links[linkIdx]];
    }
    setSettings({
      ...settings,
      footer_config: { ...settings.footer_config, columns: newCols }
    });
  };

  return (
    <motion.div key="header-footer" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-8 pb-20">
      {/* Header Configuration */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <Layout size={20} className="text-secondary" />
          <h3 className="font-heading font-bold text-lg text-primary">Header Configuration</h3>
        </div>
        <div className="p-8 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Header Logo</label>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-16 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center overflow-hidden group">
                {settings.header_config?.logo ? (
                  <img src={settings.header_config.logo} alt="Header Logo" className="max-w-full max-h-full object-contain" />
                ) : (
                  <ImageIcon className="text-gray-200" size={24} />
                )}
              </div>
              <div className="flex items-center gap-3">
                <label className="btn border border-secondary text-secondary hover:bg-secondary/5 px-4 py-2 text-xs font-bold gap-2 cursor-pointer">
                  <Upload size={14} /> Upload Header Logo
                  <input type="file" className="hidden" onChange={(e) => handleLogoUpload(e, 'header')} />
                </label>
                {settings.header_config?.logo && (
                  <button 
                    onClick={() => setSettings({...settings, header_config: {...settings.header_config, logo: ''}})}
                    className="btn bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 text-xs font-bold transition-all"
                    title="Remove Header Logo"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Top Bar Announcement</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={settings.header_config?.top_bar_enabled !== false}
                  onChange={(e) => setSettings({...settings, header_config: {...settings.header_config, top_bar_enabled: e.target.checked}})} 
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">{settings.header_config?.top_bar_enabled !== false ? 'ON' : 'OFF'}</span>
              </label>
            </div>
            <input 
              type="text" 
              value={settings.header_config?.top_bar || ''} 
              onChange={(e) => setSettings({...settings, header_config: {...settings.header_config, top_bar: e.target.value}})} 
              className={`bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all ${settings.header_config?.top_bar_enabled === false ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={settings.header_config?.top_bar_enabled === false}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Main Menu Links</label>
              <button onClick={addNavLink} className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline flex items-center gap-1"><Plus size={12}/> Add Link</button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {(settings.header_config?.nav_links || []).map((link, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                  <div className="flex flex-col gap-1 pr-2 border-r border-gray-200">
                    <button onClick={() => moveNavLink(idx, 'up')} disabled={idx === 0} className={`text-gray-400 hover:text-secondary ${idx === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}><ChevronUp size={14}/></button>
                    <button onClick={() => moveNavLink(idx, 'down')} disabled={idx === (settings.header_config?.nav_links || []).length - 1} className={`text-gray-400 hover:text-secondary ${idx === (settings.header_config?.nav_links || []).length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}><ChevronDown size={14}/></button>
                  </div>
                  <input type="text" value={link.label} onChange={(e) => updateNavLink(idx, 'label', e.target.value)} placeholder="Label" className="flex-grow bg-white border border-transparent px-3 py-1.5 rounded-lg text-xs" />
                  <input type="text" value={link.url} onChange={(e) => updateNavLink(idx, 'url', e.target.value)} placeholder="URL" className="flex-grow bg-white border border-transparent px-3 py-1.5 rounded-lg text-xs" />
                  <button onClick={() => removeNavLink(idx)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Configuration */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <Layout size={20} className="text-secondary" />
          <h3 className="font-heading font-bold text-lg text-primary">Footer Configuration</h3>
        </div>
        <div className="p-8 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Footer Logo (Optional)</label>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-16 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center overflow-hidden group">
                {settings.footer_config?.logo ? (
                  <img src={settings.footer_config.logo} alt="Footer Logo" className="max-w-full max-h-full object-contain" />
                ) : (
                  <ImageIcon className="text-gray-200" size={24} />
                )}
              </div>
              <div className="flex items-center gap-3">
                <label className="btn border border-secondary text-secondary hover:bg-secondary/5 px-4 py-2 text-xs font-bold gap-2 cursor-pointer">
                  <Upload size={14} /> Upload Footer Logo
                  <input type="file" className="hidden" onChange={(e) => handleLogoUpload(e, 'footer')} />
                </label>
                {settings.footer_config?.logo && (
                  <button 
                    onClick={() => setSettings({...settings, footer_config: {...settings.footer_config, logo: ''}})}
                    className="btn bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 text-xs font-bold transition-all"
                    title="Remove Footer Logo"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Store Description (Footer)</label>
            <textarea rows="3" value={settings.footer_config?.description || ''} onChange={(e) => setSettings({...settings, footer_config: {...settings.footer_config, description: e.target.value}})} className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="flex flex-col gap-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2"><Link size={12}/> Instagram</label>
               <input type="text" value={settings.footer_config?.social_links?.instagram || ''} onChange={(e) => setSettings({...settings, footer_config: {...settings.footer_config, social_links: {...settings.footer_config?.social_links, instagram: e.target.value}}})} className="bg-gray-50 border border-transparent px-4 py-2 rounded-lg text-xs" />
             </div>
             <div className="flex flex-col gap-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2"><Link size={12}/> Facebook</label>
               <input type="text" value={settings.footer_config?.social_links?.facebook || ''} onChange={(e) => setSettings({...settings, footer_config: {...settings.footer_config, social_links: {...settings.footer_config?.social_links, facebook: e.target.value}}})} className="bg-gray-50 border border-transparent px-4 py-2 rounded-lg text-xs" />
             </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-gray-50">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Contact Information</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="flex flex-col gap-2">
                   <input type="text" value={settings.footer_config?.contact_info?.address || ''} onChange={(e) => setSettings({...settings, footer_config: {...settings.footer_config, contact_info: {...settings.footer_config?.contact_info, address: e.target.value}}})} placeholder="Address" className="bg-gray-50 border border-transparent px-4 py-2 rounded-lg text-xs" />
                 </div>
                 <div className="flex flex-col gap-2">
                   <input type="text" value={settings.footer_config?.contact_info?.phone || ''} onChange={(e) => setSettings({...settings, footer_config: {...settings.footer_config, contact_info: {...settings.footer_config?.contact_info, phone: e.target.value}}})} placeholder="Phone" className="bg-gray-50 border border-transparent px-4 py-2 rounded-lg text-xs" />
                 </div>
                 <div className="flex flex-col gap-2">
                   <input type="email" value={settings.footer_config?.contact_info?.email || ''} onChange={(e) => setSettings({...settings, footer_config: {...settings.footer_config, contact_info: {...settings.footer_config?.contact_info, email: e.target.value}}})} placeholder="Email" className="bg-gray-50 border border-transparent px-4 py-2 rounded-lg text-xs" />
                 </div>
              </div>
           </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-gray-50">
             <div className="flex items-center justify-between">
               <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Footer Navigation Columns</label>
               <button onClick={addFooterColumn} className="text-[10px] font-bold text-secondary uppercase tracking-widest hover:underline flex items-center gap-1"><Plus size={12}/> Add Column</button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(settings.footer_config?.columns || []).map((col, colIdx) => (
                  <div key={colIdx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col gap-4 relative group">
                     <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => moveFooterColumn(colIdx, 'up')} disabled={colIdx === 0} className={`text-gray-400 hover:text-secondary ${colIdx === 0 ? 'opacity-30' : ''}`}><ChevronUp size={16}/></button>
                       <button onClick={() => moveFooterColumn(colIdx, 'down')} disabled={colIdx === (settings.footer_config?.columns || []).length - 1} className={`text-gray-400 hover:text-secondary ${colIdx === (settings.footer_config?.columns || []).length - 1 ? 'opacity-30' : ''}`}><ChevronDown size={16}/></button>
                       <button onClick={() => removeFooterColumn(colIdx)} className="text-red-400 ml-2"><Trash2 size={16}/></button>
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Column Title</label>
                        <input type="text" value={col.title} onChange={(e) => {
                          const newCols = [...settings.footer_config.columns];
                          newCols[colIdx].title = e.target.value;
                          setSettings({...settings, footer_config: {...settings.footer_config, columns: newCols}});
                        }} className="bg-white border border-transparent focus:border-secondary px-3 py-2 rounded-lg text-xs font-bold" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-gray-400">Links</label>
                          <button onClick={() => addFooterLink(colIdx)} className="text-[10px] font-bold text-secondary uppercase tracking-widest"><Plus size={10}/> Add</button>
                        </div>
                        <div className="flex flex-col gap-2">
                           {(col.links || []).map((link, linkIdx) => (
                             <div key={linkIdx} className="flex items-center gap-1">
                                <div className="flex flex-col">
                                  <button onClick={() => moveFooterLink(colIdx, linkIdx, 'up')} disabled={linkIdx === 0} className={`text-gray-400 hover:text-secondary ${linkIdx === 0 ? 'opacity-30' : ''}`}><ChevronUp size={10}/></button>
                                  <button onClick={() => moveFooterLink(colIdx, linkIdx, 'down')} disabled={linkIdx === col.links.length - 1} className={`text-gray-400 hover:text-secondary ${linkIdx === col.links.length - 1 ? 'opacity-30' : ''}`}><ChevronDown size={10}/></button>
                                </div>
                                <input type="text" value={link.label} onChange={(e) => updateFooterLink(colIdx, linkIdx, 'label', e.target.value)} placeholder="Label" className="w-1/2 bg-white border border-transparent px-2 py-1 rounded text-[10px]" />
                                <input type="text" value={link.url} onChange={(e) => updateFooterLink(colIdx, linkIdx, 'url', e.target.value)} placeholder="URL" className="w-1/2 bg-white border border-transparent px-2 py-1 rounded text-[10px]" />
                                <button onClick={() => removeFooterLink(colIdx, linkIdx)} className="text-red-300 hover:text-red-500 ml-1"><X size={12}/></button>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-gray-50">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Copyright Text</label>
            <input type="text" value={settings.footer_config?.copyright || ''} onChange={(e) => setSettings({...settings, footer_config: {...settings.footer_config, copyright: e.target.value}})} className="bg-gray-50 border border-transparent focus:bg-white focus:border-secondary px-4 py-3 rounded-lg text-sm outline-none transition-all" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderFooterTab;
