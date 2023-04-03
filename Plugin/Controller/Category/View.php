<?php
/**
 * Copyright © 2021 magerubik.com. All rights reserved.
 * @author Magerubik Team <info@magerubik.com>
 * @package Magerubik_AjaxLayer
 */

namespace Magerubik\AjaxLayer\Plugin\Controller\Category;

use Magerubik\AjaxLayer\Helper\Data as LayerData;

/**
 * Class View
 * @package Magerubik\LayeredNavigation\Controller\Plugin\Category
 */
class View
{
    /**
     * @var LayerData
     */
    protected $_moduleHelper;

    /**
     * View constructor.
     *
     * @param LayerData $moduleHelper
     */
    public function __construct(
        LayerData $moduleHelper
    ) {
        $this->_moduleHelper = $moduleHelper;
    }

    /**
     * @param \Magento\Catalog\Controller\Category\View $action
     * @param $page
     *
     * @return mixed
     */
    public function afterExecute(\Magento\Catalog\Controller\Category\View $action, $page)
    {
        if ($this->_moduleHelper->ajaxEnabled() && $action->getRequest()->isAjax()) {
            $navigation = $page->getLayout()->getBlock('catalog.leftnav');
            $products = $page->getLayout()->getBlock('category.products');
            $result = ['products' => $products->toHtml(), 'navigation' => $navigation->toHtml()];
            if ($this->_moduleHelper->getConfigValue('mrquickview/general/enabled')) {
                $quickView = $page->getLayout()->getBlock('mrquickview.quickview');
                $result['quickview'] = $quickView->toHtml();
            }
            $action->getResponse()->representJson(LayerData::jsonEncode($result));
        } else {
            return $page;
        }
    }
}
