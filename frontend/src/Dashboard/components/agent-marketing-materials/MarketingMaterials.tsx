import React, { useMemo, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import './styles.scss'
import { useMarketingMaterials } from "../../../services/admin";
import { useAuth } from "../../../contexts/auth.context";
import MarketingMaterialsCategory from "../../../models/marketingMaterialsCategory.model";
import MarketingMaterial from "../../../models/marketingMaterial.model";
import MarketingDocumentPreview
  from "../../../admin-dashboard/Admin/components/mainArea_Components/modal_popups/MarketingDocumentPreview";

const MarketingMaterials: React.FC = () => {
  const { user } = useAuth();
  const { data } = useMarketingMaterials(user!)
  const [activeFilter, setActiveFilter] = useState<Pick<MarketingMaterialsCategory, '_id' | 'name'> | undefined>();

  const categories = useMemo<Pick<MarketingMaterialsCategory, '_id' | 'name'>[]>(() => Object.entries(data?.data?.reduce<{
    [key: string]: string
  }>((a, c) => ({
    ...a,
    [(c.category as MarketingMaterialsCategory)._id]: (c.category as MarketingMaterialsCategory).name
  }), {}) ?? {}).map(([_id, name]) => ({ _id, name })), [data])

  const filteredDocuments = useMemo<MarketingMaterial[]>(() => data?.data?.filter((doc) => activeFilter === undefined || (doc.category as MarketingMaterialsCategory)._id === activeFilter._id) ?? [], [data, activeFilter])

  return (
    <div className="MarketingMaterials">
      <span className='textCustom'>Marketing Materials</span>
      <div className="MarketingMaterials-filters">
        <Button
          className={`MarketingMaterials-filter-button${activeFilter === undefined ? ' active-filter' : ''}`}
          onClick={() => setActiveFilter(undefined)}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat._id}
            className={`MarketingMaterials-filter-button${activeFilter === cat ? ' active-filter' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat.name}
          </Button>
        ))}
      </div>
      <div className="MarketingMaterials-documents">
        {filteredDocuments.map((doc) => (
          <Card className="MarketingMaterials-document-card" key={doc._id}>
            <div className="MarketingMaterials-document-icon">
              <MarketingDocumentPreview fileName={doc.document} alt={doc.head} />
            </div>
            <div className="MarketingMaterials-document-details">
              <div className="MarketingMaterials-document-name">{doc.head}</div>
              <div className="MarketingMaterials-document-preview">{doc.description}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketingMaterials
